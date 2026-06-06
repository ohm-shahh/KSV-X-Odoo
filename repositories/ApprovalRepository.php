<?php

require_once __DIR__ . '/../config/database.php';

class ApprovalRepository
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
    }

    public function createApproval(array $data): int
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO approvals
            (
                quotation_id,
                level,
                assigned_manager_id,
                status,
                remarks
            )
            VALUES
            (
                :quotation_id,
                :level,
                :assigned_manager_id,
                :status,
                :remarks
            )"
        );

        $stmt->execute($data);

        return (int)$this->pdo->lastInsertId();
    }

    public function getApproval(
        int $quotationId,
        string $level
    ): ?array {

        $stmt = $this->pdo->prepare(
            "SELECT * FROM approvals
             WHERE quotation_id = :quotation_id
             AND level = :level
             LIMIT 1"
        );

        $stmt->execute([
            ':quotation_id' => $quotationId,
            ':level' => $level
        ]);

        return $stmt->fetch() ?: null;
    }

    public function updateApproval(
        int $id,
        string $status,
        string $remarks
    ): bool {

        $stmt = $this->pdo->prepare(
            "UPDATE approvals
             SET status = :status,
                 remarks = :remarks
             WHERE id = :id"
        );

        return $stmt->execute([
            ':status' => $status,
            ':remarks' => $remarks,
            ':id' => $id
        ]);
    }

    public function getPendingApprovals(
        int $managerId
    ): array {

        $stmt = $this->pdo->prepare(
            "SELECT *
             FROM approvals
             WHERE assigned_manager_id = :manager_id
             AND status = 'pending'"
        );

        $stmt->execute([
            ':manager_id' => $managerId
        ]);

        return $stmt->fetchAll();
    }
}