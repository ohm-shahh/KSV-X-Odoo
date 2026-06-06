<?php

require_once __DIR__ . '/../config/database.php';

class InvoiceRepository
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
    }

    public function createInvoice(array $data): int
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO invoices
            (
                invoice_number,
                po_id,
                invoice_date,
                due_date,
                payment_status
            )
            VALUES
            (
                :invoice_number,
                :po_id,
                :invoice_date,
                :due_date,
                :payment_status
            )"
        );

        $stmt->execute($data);

        return (int)$this->pdo->lastInsertId();
    }

    public function getInvoiceById(
        int $invoiceId
    ): ?array {

        $stmt = $this->pdo->prepare(
            "SELECT * FROM invoices
             WHERE id = :id
             LIMIT 1"
        );

        $stmt->execute([
            ':id' => $invoiceId
        ]);

        return $stmt->fetch() ?: null;
    }

    public function getInvoiceByPO(
        int $poId
    ): ?array {

        $stmt = $this->pdo->prepare(
            "SELECT * FROM invoices
             WHERE po_id = :po_id
             LIMIT 1"
        );

        $stmt->execute([
            ':po_id' => $poId
        ]);

        return $stmt->fetch() ?: null;
    }
}