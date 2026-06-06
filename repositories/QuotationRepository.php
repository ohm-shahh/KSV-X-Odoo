<?php

require_once __DIR__ . '/../config/database.php';

class QuotationRepository
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
    }

    public function createQuotation(array $data): int
    {
        $sql = "
        INSERT INTO quotations
        (
            quotation_number,
            rfq_id,
            vendor_id,
            delivery_days,
            subtotal,
            cgst,
            sgst,
            grand_total,
            note,
            status
        )
        VALUES
        (
            :quotation_number,
            :rfq_id,
            :vendor_id,
            :delivery_days,
            :subtotal,
            :cgst,
            :sgst,
            :grand_total,
            :note,
            :status
        )";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute($data);

        return (int)$this->pdo->lastInsertId();
    }

    public function createQuotationItem(
        int $quotationId,
        int $rfqItemId,
        float $unitPrice,
        float $totalPrice
    ): bool {

        $stmt = $this->pdo->prepare(
            "INSERT INTO quotation_items
            (quotation_id, rfq_item_id, unit_price, total_price)
            VALUES
            (:quotation_id,:rfq_item_id,:unit_price,:total_price)"
        );

        return $stmt->execute([
            ':quotation_id' => $quotationId,
            ':rfq_item_id' => $rfqItemId,
            ':unit_price' => $unitPrice,
            ':total_price' => $totalPrice
        ]);
    }

    public function getQuotationById(int $id): ?array
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM quotations WHERE id=:id"
        );

        $stmt->execute([':id' => $id]);

        return $stmt->fetch() ?: null;
    }

    public function getQuotationsByRFQ(
        int $rfqId
    ): array {

        $stmt = $this->pdo->prepare(
            "SELECT * FROM quotations
             WHERE rfq_id=:rfq_id"
        );

        $stmt->execute([
            ':rfq_id' => $rfqId
        ]);

        return $stmt->fetchAll();
    }
}