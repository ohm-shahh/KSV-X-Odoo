<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../helpers/logger.php';
require_once '../../middleware/roleMiddleware.php';

try {

    $user = RoleMiddleware::allow(['admin']);

    if (!isset($_GET['user_id'])) {
        Response::error('User ID required', 400);
    }

    $pdo = Database::getConnection();

    $stmt = $pdo->prepare(
        "UPDATE users
         SET status = 'active'
         WHERE id = :id"
    );

    $stmt->execute([
        ':id' => (int)$_GET['user_id']
    ]);

    Logger::log(
        $pdo,
        $user['user_id'],
        'Vendors',
        'Vendor approved'
    );

    Response::success(
        'Vendor approved successfully'
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}