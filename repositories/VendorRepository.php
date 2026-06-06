<?php

require_once __DIR__ . '/../config/database.php';

class VendorRepository
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
    }

    public function createVendor(array $data): int
    {
        $sql = "
            INSERT INTO vendors
            (
                user_id,
                company_name,
                gstin,
                category,
                contact_details
            )
            VALUES
            (
                :user_id,
                :company_name,
                :gstin,
                :category,
                :contact_details
            )
        ";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':user_id' => $data['user_id'],
            ':company_name' => $data['company_name'],
            ':gstin' => $data['gstin'],
            ':category' => $data['category'],
            ':contact_details' => $data['contact_details']
        ]);

        return (int)$this->pdo->lastInsertId();
    }

    public function getVendorById(int $id): ?array
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM vendors WHERE id = :id LIMIT 1"
        );

        $stmt->execute([
            ':id' => $id
        ]);

        $vendor = $stmt->fetch();

        return $vendor ?: null;
    }

    public function getVendorByUserId(int $userId): ?array
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM vendors
             WHERE user_id = :user_id
             LIMIT 1"
        );

        $stmt->execute([
            ':user_id' => $userId
        ]);

        $vendor = $stmt->fetch();

        return $vendor ?: null;
    }

    public function getAllVendors(): array
    {
        $stmt = $this->pdo->query(
            "SELECT * FROM vendors ORDER BY id DESC"
        );

        return $stmt->fetchAll();
    }

    public function updateVendor(
        int $id,
        array $data
    ): bool {

        $sql = "
            UPDATE vendors
            SET
                company_name = :company_name,
                gstin = :gstin,
                category = :category,
                contact_details = :contact_details
            WHERE id = :id
        ";

        $stmt = $this->pdo->prepare($sql);

        return $stmt->execute([
            ':company_name' => $data['company_name'],
            ':gstin' => $data['gstin'],
            ':category' => $data['category'],
            ':contact_details' => $data['contact_details'],
            ':id' => $id
        ]);
    }

    public function deleteVendor(int $id): bool
    {
        $stmt = $this->pdo->prepare(
            "DELETE FROM vendors WHERE id = :id"
        );

        return $stmt->execute([
            ':id' => $id
        ]);
    }
}