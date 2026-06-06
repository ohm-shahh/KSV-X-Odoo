<?php

require_once __DIR__ . '/../repositories/QuotationRepository.php';
require_once __DIR__ . '/../repositories/RFQRepository.php';
require_once __DIR__ . '/../repositories/VendorRepository.php';
require_once __DIR__ . '/../repositories/ApprovalRepository.php';
require_once __DIR__ . '/../repositories/UserRepository.php';
require_once __DIR__ . '/../helpers/utils.php';
require_once __DIR__ . '/../helpers/logger.php';
require_once __DIR__ . '/../config/database.php';

class QuotationService
{
    private PDO $pdo;
    private QuotationRepository $quotationRepo;
    private RFQRepository $rfqRepo;
    private VendorRepository $vendorRepo;
    private ApprovalRepository $approvalRepo;
    private UserRepository $userRepo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
        $this->quotationRepo = new QuotationRepository();
        $this->rfqRepo = new RFQRepository();
        $this->vendorRepo = new VendorRepository();
        $this->approvalRepo = new ApprovalRepository();
        $this->userRepo = new UserRepository();
    }

    public function submitQuotation(
        array $data,
        int $vendorUserId
    ): array {

        $vendor = $this->vendorRepo
            ->getVendorByUserId($vendorUserId);

        if (!$vendor) {
            throw new Exception(
                "Vendor profile not found for this user"
            );
        }

        $status = $data['status'] ?? 'under_review';
        $manager = null;

        if ($status !== 'draft') {
            $manager = $this->userRepo->findById(
                (int)$data['manager_id']
            );

            if (
                !$manager ||
                !in_array($manager['role'], ['manager', 'admin'], true) ||
                $manager['status'] !== 'active'
            ) {
                throw new Exception("Invalid approval manager");
            }
        }

        $rfqItems = $this->rfqRepo
            ->getRFQItems($data['rfq_id']);

        if (!$rfqItems) {
            throw new Exception("RFQ items not found");
        }

        $subtotal = 0;

        $this->pdo->beginTransaction();

        try {

            foreach ($rfqItems as $rfqItem) {

                $rfqItemId = $rfqItem['id'];
                $qty = $rfqItem['quantity'];

                $unitPrice =
                    $data['prices'][$rfqItemId];

                $subtotal +=
                    ($qty * $unitPrice);
            }

            $cgst = $subtotal * 0.09;
            $sgst = $subtotal * 0.09;

            $grandTotal =
                $subtotal + $cgst + $sgst;

            $quotationNumber =
                Utils::generateQuotationNumber();

            $quotationId =
                $this->quotationRepo
                ->createQuotation([
                    'quotation_number' => $quotationNumber,
                    'rfq_id' => $data['rfq_id'],
                    'vendor_id' => $vendor['id'],
                    'delivery_days' => $data['delivery_days'],
                    'subtotal' => $subtotal,
                    'cgst' => $cgst,
                    'sgst' => $sgst,
                    'grand_total' => $grandTotal,
                    'note' => $data['note'] ?? '',
                    'status' => $status
                ]);

            foreach ($rfqItems as $rfqItem) {

                $unitPrice =
                    $data['prices'][$rfqItem['id']];

                $totalPrice =
                    $unitPrice *
                    $rfqItem['quantity'];

                $this->quotationRepo
                    ->createQuotationItem(
                        $quotationId,
                        $rfqItem['id'],
                        $unitPrice,
                        $totalPrice
                    );
            }

            if ($status !== 'draft') {
                $this->approvalRepo->createApproval([
                    'quotation_id' => $quotationId,
                    'level' => 'L1_Review',
                    'assigned_manager_id' => $manager['id'],
                    'status' => 'pending',
                    'remarks' => ''
                ]);
            }

            Logger::log(
                $this->pdo,
                $vendorUserId,
                'Quotation',
                "Quotation Submitted"
            );

            $this->pdo->commit();

            return [
                'quotation_id' => $quotationId,
                'quotation_number' => $quotationNumber,
                'grand_total' => $grandTotal
            ];

        } catch (Exception $e) {

            $this->pdo->rollBack();

            throw $e;
        }
    }
}
