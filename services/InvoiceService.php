<?php

require_once __DIR__ . '/../repositories/InvoiceRepository.php';
require_once __DIR__ . '/../repositories/PORepository.php';
require_once __DIR__ . '/../helpers/utils.php';
require_once __DIR__ . '/../helpers/logger.php';
require_once __DIR__ . '/../config/database.php';

class InvoiceService
{
    private PDO $pdo;
    private InvoiceRepository $invoiceRepo;
    private PORepository $poRepo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
        $this->invoiceRepo = new InvoiceRepository();
        $this->poRepo = new PORepository();
    }

    public function generateInvoice(
        int $quotationId,
        int $userId
    ): array {

        $po = $this->poRepo
            ->getPOByQuotationId($quotationId);

        if (!$po) {
            throw new Exception(
                'Purchase Order not found'
            );
        }

        $invoiceNumber =
            Utils::generateInvoiceNumber();

        $invoiceId =
            $this->invoiceRepo
                ->createInvoice([
                    'invoice_number' => $invoiceNumber,
                    'po_id' => $po['id'],
                    'invoice_date' => date('Y-m-d'),
                    'due_date' => date(
                        'Y-m-d',
                        strtotime('+30 days')
                    ),
                    'payment_status' => 'pending_payment'
                ]);

        Logger::log(
            $this->pdo,
            $userId,
            'Invoices',
            "Invoice Generated {$invoiceNumber}"
        );

        return [
            'invoice_id' => $invoiceId,
            'invoice_number' => $invoiceNumber
        ];
    }
}