<?php

require_once '../../config/cors.php';

require_once '../../helpers/response.php';

require_once '../../middleware/auth.php';

require_once '../../middleware/roleMiddleware.php';

require_once '../../middleware/validation.php';

require_once '../../services/VendorService.php';

try {

    ValidationMiddleware::allowMethods(['GET']);

    RoleMiddleware::allow([
        'admin',
        'officer',
        'manager'
    ]);

    $vendorService = new VendorService();

    $vendors = $vendorService->listVendors();

    Response::success(
        'Vendors fetched successfully',
        $vendors
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}