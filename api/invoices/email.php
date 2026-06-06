<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';

try {

    ValidationMiddleware::allowMethods([
        'POST'
    ]);

    RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    $data =
        ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        [
            'invoice_id',
            'email'
        ]
    );

    Response::success(
        'Invoice email queued successfully',
        [
            'invoice_id' => $data['invoice_id'],
            'email' => $data['email']
        ]
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}