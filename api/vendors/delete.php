<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../services/VendorService.php';

try {

    $user = RoleMiddleware::allow([
        'admin'
    ]);

    if (!isset($_GET['id'])) {

        Response::error(
            'Vendor ID is required',
            400
        );
    }

    $vendorId = (int)$_GET['id'];

    $service = new VendorService();

    $service->deleteVendor(
        $vendorId,
        $user['user_id']
    );

    Response::success(
        'Vendor deleted successfully'
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}