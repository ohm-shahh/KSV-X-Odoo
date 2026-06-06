<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';

try {

    $user = RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    $data = ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        [
            'rfq_id',
            'vendor_ids'
        ]
    );

    $pdo = Database::getConnection();

    foreach ($data['vendor_ids'] as $vendorId) {

        $stmt = $pdo->prepare(
            "INSERT INTO rfq_vendors
            (rfq_id, vendor_id)
            VALUES
            (:rfq_id, :vendor_id)"
        );

        $stmt->execute([
            ':rfq_id' => $data['rfq_id'],
            ':vendor_id' => $vendorId
        ]);
    }

    Response::success(
        'Vendors assigned successfully'
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}