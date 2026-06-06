<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';

try {

    AuthMiddleware::authenticate();

    if (!isset($_GET['id'])) {
        Response::error(
            'Invoice ID required',
            400
        );
    }

    Response::success(
        'PDF generation endpoint ready',
        [
            'invoice_id' => (int)$_GET['id'],
            'status' => 'pending_pdf_generation'
        ]
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}