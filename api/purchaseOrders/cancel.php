<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../helpers/logger.php';
require_once '../../middleware/roleMiddleware.php';

try {

    $user = RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    if (!isset($_GET['id'])) {
        Response::error(
            'PO ID required',
            400
        );
    }

    $pdo = Database::getConnection();

    $stmt = $pdo->prepare(
        "UPDATE purchase_orders
         SET status = 'cancelled'
         WHERE id = :id"
    );

    $stmt->execute([
        ':id' => (int)$_GET['id']
    ]);

    Logger::log(
        $pdo,
        $user['user_id'],
        'PurchaseOrder',
        'Purchase Order Cancelled'
    );

    Response::success(
        'Purchase Order cancelled successfully'
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}