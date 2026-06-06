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

        $this->repo->updateApproval(
            $approval['id'],
            'approved',
            $remarks
        );

        Logger::log(
            $this->pdo,
            $managerId,
            'Approvals',
            "Approved quotation {$quotationId}"
        );

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

        $this->repo->updateApproval(
            $approval['id'],
            'rejected',
            $remarks
        );

        Logger::log(
            $this->pdo,
            $managerId,
            'Approvals',
            "Rejected quotation {$quotationId}"
        );

        return true;
    }

    public function pending(
        int $managerId
    ): array {

        return $this->repo
            ->getPendingApprovals($managerId);
    }
}