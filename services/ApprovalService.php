<?php

require_once __DIR__ . '/../repositories/ApprovalRepository.php';
require_once __DIR__ . '/../helpers/logger.php';
require_once __DIR__ . '/../config/database.php';

class ApprovalService
{
    private PDO $pdo;
    private ApprovalRepository $repo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
        $this->repo = new ApprovalRepository();
    }

    public function approve(
        int $quotationId,
        string $level,
        int $managerId,
        string $remarks = ''
    ): bool {

        $approval = $this->repo->getApproval(
            $quotationId,
            $level
        );

        if (!$approval) {
            throw new Exception(
                'Approval record not found'
            );
        }

        if ((int)$approval['assigned_manager_id'] !== $managerId) {
            throw new Exception(
                'This approval is assigned to another manager'
            );
        }

        if ($approval['status'] !== 'pending') {
            throw new Exception(
                'Approval has already been completed'
            );
        }

        $this->pdo->beginTransaction();

        try {
        $this->repo->updateApproval(
            $approval['id'],
            'approved',
            $remarks
        );

        $stmt = $this->pdo->prepare(
            "UPDATE quotations
             SET status = 'approved'
             WHERE id = :id"
        );
        $stmt->execute([
            ':id' => $quotationId
        ]);

        Logger::log(
            $this->pdo,
            $managerId,
            'Approvals',
            "Approved quotation {$quotationId}"
        );

        $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }

        return true;
    }

    public function reject(
        int $quotationId,
        string $level,
        int $managerId,
        string $remarks
    ): bool {

        $approval = $this->repo->getApproval(
            $quotationId,
            $level
        );

        if (!$approval) {
            throw new Exception(
                'Approval record not found'
            );
        }

        if ((int)$approval['assigned_manager_id'] !== $managerId) {
            throw new Exception(
                'This approval is assigned to another manager'
            );
        }

        if ($approval['status'] !== 'pending') {
            throw new Exception(
                'Approval has already been completed'
            );
        }

        $this->pdo->beginTransaction();

        try {
        $this->repo->updateApproval(
            $approval['id'],
            'rejected',
            $remarks
        );

        $stmt = $this->pdo->prepare(
            "UPDATE quotations
             SET status = 'rejected'
             WHERE id = :id"
        );
        $stmt->execute([
            ':id' => $quotationId
        ]);

        Logger::log(
            $this->pdo,
            $managerId,
            'Approvals',
            "Rejected quotation {$quotationId}"
        );

        $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }

        return true;
    }

    public function pending(
        int $managerId
    ): array {

        return $this->repo
            ->getPendingApprovals($managerId);
    }
}
