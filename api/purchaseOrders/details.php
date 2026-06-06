<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';

try {

    AuthMiddleware::authenticate();

    if (!isset($_GET['quotation_id'])) {
        Response::error('Quotation ID required', 400);
    }

    $pdo = Database::getConnection();

    $stmt = $pdo->prepare(
        "SELECT *
         FROM purchase_orders
         WHERE quotation_id = :quotation_id
         LIMIT 1"
    );

    $stmt->execute([
        ':quotation_id' => (int)$_GET['quotation_id']
    ]);

    $po = $stmt->fetch();

    if (!$po) {
        Response::error('Purchase Order not found', 404);
    }

    Response::success(
        'Purchase Order fetched successfully',
        $po
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}