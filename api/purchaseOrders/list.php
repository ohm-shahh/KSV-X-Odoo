<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';

try {

    AuthMiddleware::authenticate();

    $pdo = Database::getConnection();

    $stmt = $pdo->query(
        "SELECT *
         FROM purchase_orders
         ORDER BY id DESC"
    );

    Response::success(
        'Purchase Orders fetched successfully',
        $stmt->fetchAll()
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}