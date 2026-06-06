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

    $analytics = [];

    $analytics['total_approvals'] =
        $pdo->query(
            "SELECT COUNT(*) FROM approvals"
        )->fetchColumn();

    $analytics['approved'] =
        $pdo->query(
            "SELECT COUNT(*) FROM approvals
             WHERE status='approved'"
        )->fetchColumn();

    $analytics['rejected'] =
        $pdo->query(
            "SELECT COUNT(*) FROM approvals
             WHERE status='rejected'"
        )->fetchColumn();

    $analytics['pending'] =
        $pdo->query(
            "SELECT COUNT(*) FROM approvals
             WHERE status='pending'"
        )->fetchColumn();

    Response::success(
        'Approval analytics fetched',
        $analytics
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}