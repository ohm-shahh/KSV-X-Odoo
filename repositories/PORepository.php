<?php

require_once __DIR__ . '/../config/database.php';

class PORepository
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
    }

    public function createPO(array $data): int
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO purchase_orders
            (
                po_number,
                quotation_id,
                vendor_id,
                po_date,
                subtotal,
                cgst,
                sgst,
                grand_total,
                status
            )
            VALUES
            (
                :po_number,
                :quotation_id,
                :vendor_id,
                :po_date,
                :subtotal,
                :cgst,
                :sgst,
                :grand_total,
                :status
            )"
        );

        $stmt->execute($data);

        return (int)$this->pdo->lastInsertId();
    }

    public function getPOByQuotationId(
        int $quotationId
    ): ?array {

        $stmt = $this->pdo->prepare(
            "SELECT * FROM purchase_orders
             WHERE quotation_id = :quotation_id
             LIMIT 1"
        );

        $stmt->execute([
            ':quotation_id' => $quotationId
        ]);

        return $stmt->fetch() ?: null;
    }
}