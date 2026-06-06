<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';
require_once '../../services/ApprovalService.php';

try {

    ValidationMiddleware::allowMethods(['POST']);

    $user = RoleMiddleware::allow([
        'manager',
        'admin'
    ]);

    $data = ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        [
            'quotation_id',
            'level',
            'remarks'
        ]
    );

    $service = new ApprovalService();

    $service->reject(
        (int)$data['quotation_id'],
        $data['level'],
        $user['user_id'],
        $data['remarks']
    );

    Response::success(
        'Quotation rejected successfully'
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}