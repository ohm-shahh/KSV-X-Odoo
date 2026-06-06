<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';

try {

    ValidationMiddleware::allowMethods(['GET']);

    RoleMiddleware::allow([
        'admin',
        'officer',
        'manager'
    ]);

    $pdo = Database::getConnection();

    $stats = [];

    $stats['users'] =
        $pdo->query(
            "SELECT COUNT(*) FROM users"
        )->fetchColumn();

    $stats['vendors'] =
        $pdo->query(
            "SELECT COUNT(*) FROM vendors"
        )->fetchColumn();

    $stats['rfqs'] =
        $pdo->query(
            "SELECT COUNT(*) FROM rfqs"
        )->fetchColumn();

    $stats['quotations'] =
        $pdo->query(
            "SELECT COUNT(*) FROM quotations"
        )->fetchColumn();

    $stats['purchase_orders'] =
        $pdo->query(
            "SELECT COUNT(*) FROM purchase_orders"
        )->fetchColumn();

    $stats['invoices'] =
        $pdo->query(
            "SELECT COUNT(*) FROM invoices"
        )->fetchColumn();

    Response::success(
        'Dashboard data fetched',
        $stats
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}