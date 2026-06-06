<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';
require_once '../../services/QuotationService.php';

try {

    ValidationMiddleware::allowMethods(['POST']);

    $user = RoleMiddleware::allow(['vendor']);

    $data = ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        [
            'rfq_id',
            'delivery_days',
            'prices'
        ]
    );

    $data['status'] = 'draft';

    $service = new QuotationService();

    $result = $service->submitQuotation(
        $data,
        $user['user_id']
    );

    Response::success(
        'Quotation draft saved',
        $result
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}