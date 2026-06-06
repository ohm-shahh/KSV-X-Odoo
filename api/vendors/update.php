<?php

require_once '../../config/cors.php';

require_once '../../helpers/response.php';

require_once '../../middleware/auth.php';

require_once '../../middleware/roleMiddleware.php';

require_once '../../middleware/validation.php';

require_once '../../services/VendorService.php';

try {

    ValidationMiddleware::allowMethods([
        'PUT',
        'POST'
    ]);

    RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    if (!isset($_GET['id'])) {

        Response::error(
            'Vendor ID is required',
            400
        );
    }

    $vendorId = (int) $_GET['id'];

    $data = ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        [
            'company_name',
            'gstin',
            'category',
            'contact_details'
        ]
    );

    $vendorService = new VendorService();

    $vendorService->updateVendor(
        $vendorId,
        $data
    );

    Response::success(
        'Vendor updated successfully'
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}