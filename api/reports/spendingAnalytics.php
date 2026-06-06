<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';

try {

    RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    $pdo = Database::getConnection();

    $stmt = $pdo->query(
        "SELECT
            COUNT(*) AS total_purchase_orders,
            SUM(grand_total) AS total_spend,
            AVG(grand_total) AS average_spend
         FROM purchase_orders"
    );

    $analytics = $stmt->fetch();

    Response::success(
        'Spending analytics fetched',
        $analytics
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}