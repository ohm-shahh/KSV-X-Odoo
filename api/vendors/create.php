<?php

require_once '../../config/cors.php';

require_once '../../helpers/response.php';

require_once '../../middleware/auth.php';

require_once '../../middleware/roleMiddleware.php';

require_once '../../middleware/validation.php';

require_once '../../services/VendorService.php';

try {

    ValidationMiddleware::allowMethods(['POST']);

    $user = RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    $data = ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        [
            'user_id',
            'company_name',
            'gstin',
            'category',
            'contact_details'
        ]
    );

    $vendorService = new VendorService();

    $result = $vendorService->createVendor($data);

    Response::success(
        'Vendor created successfully',
        $result,
        201
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}