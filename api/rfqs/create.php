<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';
require_once '../../services/RFQService.php';

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
            'title',
            'category',
            'deadline',
            'items'
        ]
    );

    $service = new RFQService();

    $result = $service->createRFQ(
        $data,
        $user['user_id']
    );

    Response::success(
        'RFQ created successfully',
        $result,
        201
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}