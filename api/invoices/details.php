<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';
require_once '../../middleware/validation.php';

try {

    ValidationMiddleware::allowMethods(['GET']);

    AuthMiddleware::authenticate();

    if (!isset($_GET['id'])) {
        Response::error(
            'Invoice ID is required',
            400
        );
    }

    $pdo = Database::getConnection();

    $stmt = $pdo->prepare(
        "SELECT *
         FROM invoices
         WHERE id = :id
         LIMIT 1"
    );

    $stmt->execute([
        ':id' => (int)$_GET['id']
    ]);

    $invoice = $stmt->fetch();

    if (!$invoice) {
        Response::error(
            'Invoice not found',
            404
        );
    }

    Response::success(
        'Invoice fetched successfully',
        $invoice
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}