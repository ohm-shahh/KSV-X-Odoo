<?php

require_once __DIR__ . '/../config/database.php';

class RFQRepository
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
    }

    public function createRFQ(array $data): int
    {
        $sql = "
            INSERT INTO rfqs
            (
                rfq_number,
                title,
                category,
                deadline,
                description,
                created_by,
                status
            )
            VALUES
            (
                :rfq_number,
                :title,
                :category,
                :deadline,
                :description,
                :created_by,
                :status
            )
        ";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':rfq_number' => $data['rfq_number'],
            ':title' => $data['title'],
            ':category' => $data['category'],
            ':deadline' => $data['deadline'],
            ':description' => $data['description'],
            ':created_by' => $data['created_by'],
            ':status' => $data['status'] ?? 'draft'
        ]);

        return (int)$this->pdo->lastInsertId();
    }

    public function createRFQItem(
        int $rfqId,
        array $item
    ): bool {

        $sql = "
            INSERT INTO rfq_items
            (
                rfq_id,
                item_name,
                quantity
            )
            VALUES
            (
                :rfq_id,
                :item_name,
                :quantity
            )
        ";

        $stmt = $this->pdo->prepare($sql);

        return $stmt->execute([
            ':rfq_id' => $rfqId,
            ':item_name' => $item['item_name'],
            ':quantity' => $item['quantity']
        ]);
    }

    public function getRFQById(int $rfqId): ?array
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM rfqs WHERE id = :id"
        );

        $stmt->execute([
            ':id' => $rfqId
        ]);

        $rfq = $stmt->fetch();

        return $rfq ?: null;
    }

    public function getRFQItems(int $rfqId): array
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM rfq_items
             WHERE rfq_id = :rfq_id"
        );

        $stmt->execute([
            ':rfq_id' => $rfqId
        ]);

        return $stmt->fetchAll();
    }

    public function getAllRFQs(): array
    {
        $stmt = $this->pdo->query(
            "SELECT * FROM rfqs
             ORDER BY id DESC"
        );

        return $stmt->fetchAll();
    }

    public function publishRFQ(int $rfqId): bool
    {
        $stmt = $this->pdo->prepare(
            "UPDATE rfqs
             SET status = 'published'
             WHERE id = :id"
        );

        return $stmt->execute([
            ':id' => $rfqId
        ]);
    }
}