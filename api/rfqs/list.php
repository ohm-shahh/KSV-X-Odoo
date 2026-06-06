<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';
require_once '../../services/RFQService.php';

try {

    ValidationMiddleware::allowMethods(['GET']);

    RoleMiddleware::allow([
        'admin',
        'officer',
        'manager',
        'vendor'
    ]);

    $service = new RFQService();

    $rfqs = $service->listRFQs();

    Response::success(
        'RFQs fetched successfully',
        $rfqs
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}
