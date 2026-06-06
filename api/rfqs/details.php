<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';
require_once '../../services/RFQService.php';

try {

    AuthMiddleware::authenticate();

    if (!isset($_GET['id'])) {
        Response::error(
            'RFQ ID required',
            400
        );
    }

    $service = new RFQService();

    $rfq = $service->getRFQDetails(
        (int)$_GET['id']
    );

    Response::success(
        'RFQ fetched successfully',
        $rfq
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}