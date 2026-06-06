<?php

require_once __DIR__ . '/../repositories/PORepository.php';
require_once __DIR__ . '/../repositories/QuotationRepository.php';
require_once __DIR__ . '/../helpers/utils.php';
require_once __DIR__ . '/../helpers/logger.php';
require_once __DIR__ . '/../config/database.php';

class PurchaseOrderService
{
    private PDO $pdo;
    private PORepository $poRepo;
    private QuotationRepository $quotationRepo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
        $this->poRepo = new PORepository();
        $this->quotationRepo = new QuotationRepository();
    }

    public function generatePO(
        int $quotationId,
        int $userId
    ): array {

        $quotation =
            $this->quotationRepo
                ->getQuotationById($quotationId);

        if (!$quotation) {
            throw new Exception(
                "Quotation not found"
            );
        }

        if (
            $quotation['status'] !== 'approved'
        ) {
            throw new Exception(
                "Quotation is not approved"
            );
        }

        $poNumber =
            Utils::generatePONumber();

        $poId =
            $this->poRepo->createPO([
                'po_number' => $poNumber,
                'quotation_id' => $quotationId,
                'vendor_id' => $quotation['vendor_id'],
                'po_date' => date('Y-m-d'),
                'subtotal' => $quotation['subtotal'],
                'cgst' => $quotation['cgst'],
                'sgst' => $quotation['sgst'],
                'grand_total' => $quotation['grand_total'],
                'status' => 'generated'
            ]);

        Logger::log(
            $this->pdo,
            $userId,
            'PurchaseOrder',
            "PO Generated {$poNumber}"
        );

        return [
            'po_id' => $poId,
            'po_number' => $poNumber
        ];
    }
}