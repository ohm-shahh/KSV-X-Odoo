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

    $analytics['total_rfqs'] =
        $pdo->query(
            "SELECT COUNT(*) FROM rfqs"
        )->fetchColumn();

    $analytics['draft_rfqs'] =
        $pdo->query(
            "SELECT COUNT(*) FROM rfqs
             WHERE status='draft'"
        )->fetchColumn();

    $analytics['published_rfqs'] =
        $pdo->query(
            "SELECT COUNT(*) FROM rfqs
             WHERE status='published'"
        )->fetchColumn();

    $analytics['closed_rfqs'] =
        $pdo->query(
            "SELECT COUNT(*) FROM rfqs
             WHERE status='closed'"
        )->fetchColumn();

    Response::success(
        'RFQ analytics fetched',
        $analytics
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}