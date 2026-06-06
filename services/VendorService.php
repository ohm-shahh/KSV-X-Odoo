<?php

require_once __DIR__ . '/../repositories/VendorRepository.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../helpers/logger.php';
require_once __DIR__ . '/../config/database.php';

class VendorService
{
    private VendorRepository $vendorRepository;
    private PDO $pdo;

    public function __construct()
    {
        $this->vendorRepository = new VendorRepository();
        $this->pdo = Database::getConnection();
    }

    public function createVendor(array $data): array
    {
        if (!Validator::gstin($data['gstin'])) {
            throw new Exception("Invalid GSTIN");
        }

        $this->pdo->beginTransaction();

        try {

            $vendorId = $this->vendorRepository->createVendor($data);

            Logger::log(
                $this->pdo,
                $data['user_id'],
                'Vendors',
                "Vendor created ID: {$vendorId}"
            );

            $this->pdo->commit();

            return [
                'vendor_id' => $vendorId
            ];

        } catch (Exception $e) {

            $this->pdo->rollBack();

            throw $e;
        }
    }

    public function getVendor(int $vendorId): array
    {
        $vendor = $this->vendorRepository
            ->getVendorById($vendorId);

        if (!$vendor) {
            throw new Exception("Vendor not found");
        }

        return $vendor;
    }

    public function listVendors(): array
    {
        return $this->vendorRepository
            ->getAllVendors();
    }

    public function updateVendor(
        int $vendorId,
        array $data
    ): bool {

        $vendor = $this->vendorRepository
            ->getVendorById($vendorId);

        if (!$vendor) {
            throw new Exception("Vendor not found");
        }

        $updated = $this->vendorRepository
            ->updateVendor($vendorId, $data);

        Logger::log(
            $this->pdo,
            $vendor['user_id'],
            'Vendors',
            "Vendor updated ID: {$vendorId}"
        );

        return $updated;
    }

    public function deleteVendor(
        int $vendorId,
        int $userId
    ): bool {

        $deleted = $this->vendorRepository
            ->deleteVendor($vendorId);

        Logger::log(
            $this->pdo,
            $userId,
            'Vendors',
            "Vendor deleted ID: {$vendorId}"
        );

        return $deleted;
    }
}