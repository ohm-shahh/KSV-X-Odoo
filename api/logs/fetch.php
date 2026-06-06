<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';

try {

    RoleMiddleware::allow(['admin']);

    $pdo = Database::getConnection();

    $stmt = $pdo->query(
        "SELECT *
         FROM audit_logs
         ORDER BY created_at DESC
         LIMIT 500"
    );

    Response::success(
        'Audit logs fetched successfully',
        $stmt->fetchAll()
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}