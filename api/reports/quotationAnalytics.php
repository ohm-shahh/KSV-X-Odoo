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

    $analytics['total_quotations'] =
        $pdo->query(
            "SELECT COUNT(*) FROM quotations"
        )->fetchColumn();

    $analytics['approved'] =
        $pdo->query(
            "SELECT COUNT(*) FROM quotations
             WHERE status='approved'"
        )->fetchColumn();

    $analytics['rejected'] =
        $pdo->query(
            "SELECT COUNT(*) FROM quotations
             WHERE status='rejected'"
        )->fetchColumn();

    $analytics['under_review'] =
        $pdo->query(
            "SELECT COUNT(*) FROM quotations
             WHERE status='under_review'"
        )->fetchColumn();

    Response::success(
        'Quotation analytics fetched',
        $analytics
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}