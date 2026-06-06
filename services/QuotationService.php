<?php

require_once __DIR__ . '/../repositories/QuotationRepository.php';
require_once __DIR__ . '/../repositories/RFQRepository.php';
require_once __DIR__ . '/../helpers/utils.php';
require_once __DIR__ . '/../helpers/logger.php';
require_once __DIR__ . '/../config/database.php';

class QuotationService
{
    private PDO $pdo;
    private QuotationRepository $quotationRepo;
    private RFQRepository $rfqRepo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
        $this->quotationRepo = new QuotationRepository();
        $this->rfqRepo = new RFQRepository();
    }

    public function submitQuotation(
        array $data,
        int $vendorId
    ): array {

        $rfqItems = $this->rfqRepo
            ->getRFQItems($data['rfq_id']);

        if (!$rfqItems) {
            throw new Exception("RFQ items not found");
        }

        $subtotal = 0;

        $this->pdo->beginTransaction();

        try {

            foreach ($rfqItems as $rfqItem) {

                $rfqItemId = $rfqItem['id'];
                $qty = $rfqItem['quantity'];

                $unitPrice =
                    $data['prices'][$rfqItemId];

                $subtotal +=
                    ($qty * $unitPrice);
            }

            $cgst = $subtotal * 0.09;
            $sgst = $subtotal * 0.09;

            $grandTotal =
                $subtotal + $cgst + $sgst;

            $quotationNumber =
                Utils::generateQuotationNumber();

            $quotationId =
                $this->quotationRepo
                ->createQuotation([
                    'quotation_number' => $quotationNumber,
                    'rfq_id' => $data['rfq_id'],
                    'vendor_id' => $vendorId,
                    'delivery_days' => $data['delivery_days'],
                    'subtotal' => $subtotal,
                    'cgst' => $cgst,
                    'sgst' => $sgst,
                    'grand_total' => $grandTotal,
                    'note' => $data['note'] ?? '',
                    'status' => 'submitted'
                ]);

            foreach ($rfqItems as $rfqItem) {

                $unitPrice =
                    $data['prices'][$rfqItem['id']];

                $totalPrice =
                    $unitPrice *
                    $rfqItem['quantity'];

                $this->quotationRepo
                    ->createQuotationItem(
                        $quotationId,
                        $rfqItem['id'],
                        $unitPrice,
                        $totalPrice
                    );
            }

            Logger::log(
                $this->pdo,
                $vendorId,
                'Quotation',
                "Quotation Submitted"
            );

            $this->pdo->commit();

            return [
                'quotation_id' => $quotationId,
                'quotation_number' => $quotationNumber,
                'grand_total' => $grandTotal
            ];

        } catch (Exception $e) {

            $this->pdo->rollBack();

            throw $e;
        }
    }
}