<?php

require_once __DIR__ . '/../repositories/RFQRepository.php';
require_once __DIR__ . '/../helpers/logger.php';
require_once __DIR__ . '/../helpers/utils.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../config/database.php';

class RFQService
{
    private RFQRepository $rfqRepository;
    private PDO $pdo;

    public function __construct()
    {
        $this->rfqRepository = new RFQRepository();
        $this->pdo = Database::getConnection();
    }

    public function createRFQ(
        array $data,
        int $userId
    ): array {

        if (
            !Validator::futureDate(
                $data['deadline']
            )
        ) {
            throw new Exception(
                "Deadline must be a future date"
            );
        }

        if (
            !isset($data['items']) ||
            count($data['items']) === 0
        ) {
            throw new Exception(
                "At least one RFQ item is required"
            );
        }

        $this->pdo->beginTransaction();

        try {

            $rfqNumber =
                Utils::generateRFQNumber();

            $rfqId =
                $this->rfqRepository->createRFQ([
                    'rfq_number' => $rfqNumber,
                    'title' => $data['title'],
                    'category' => $data['category'],
                    'deadline' => $data['deadline'],
                    'description' => $data['description'] ?? '',
                    'created_by' => $userId,
                    'status' => 'draft'
                ]);

            foreach ($data['items'] as $item) {

                if (
                    empty($item['item_name']) ||
                    $item['quantity'] <= 0
                ) {
                    throw new Exception(
                        "Invalid RFQ item"
                    );
                }

                $this->rfqRepository
                    ->createRFQItem(
                        $rfqId,
                        $item
                    );
            }

            Logger::log(
                $this->pdo,
                $userId,
                'RFQ',
                "RFQ Created: {$rfqNumber}"
            );

            $this->pdo->commit();

            return [
                'rfq_id' => $rfqId,
                'rfq_number' => $rfqNumber
            ];

        } catch (Exception $e) {

            $this->pdo->rollBack();

            throw $e;
        }
    }

    public function listRFQs(): array
    {
        return $this->rfqRepository
            ->getAllRFQs();
    }

    public function publishRFQ(
        int $rfqId,
        int $userId
    ): bool {

        $rfq = $this->rfqRepository
            ->getRFQById($rfqId);

        if (!$rfq) {
            throw new Exception(
                "RFQ not found"
            );
        }

        $published =
            $this->rfqRepository
                ->publishRFQ($rfqId);

        Logger::log(
            $this->pdo,
            $userId,
            'RFQ',
            "RFQ Published ID: {$rfqId}"
        );

        return $published;
    }

    public function getRFQDetails(
        int $rfqId
    ): array {

        $rfq =
            $this->rfqRepository
                ->getRFQById($rfqId);

        if (!$rfq) {
            throw new Exception(
                "RFQ not found"
            );
        }

        $rfq['items'] =
            $this->rfqRepository
                ->getRFQItems($rfqId);

        return $rfq;
    }
}