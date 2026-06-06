<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';
require_once '../../services/PurchaseOrderService.php';

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
            'quotation_id'
        ]
    );

    $service =
        new PurchaseOrderService();

    $result =
        $service->generatePO(
            (int)$data['quotation_id'],
            $user['user_id']
        );

    Response::success(
        'Purchase Order generated successfully',
        $result,
        201
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}