<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';

try {

    AuthMiddleware::authenticate();

    if (!isset($_GET['id'])) {
        Response::error(
            'PO ID required',
            400
        );
    }

    Response::success(
        'PO download endpoint ready',
        [
            'po_id' => (int)$_GET['id']
        ]
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}