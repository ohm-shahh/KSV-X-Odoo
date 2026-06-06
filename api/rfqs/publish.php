<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';
require_once '../../services/RFQService.php';

try {

    ValidationMiddleware::allowMethods([
        'POST',
        'PUT'
    ]);

    $user = RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    if (!isset($_GET['id'])) {

        Response::error(
            'RFQ ID is required',
            400
        );
    }

    $rfqId = (int)$_GET['id'];

    $service = new RFQService();

    $service->publishRFQ(
        $rfqId,
        $user['user_id']
    );

    Response::success(
        'RFQ published successfully'
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}