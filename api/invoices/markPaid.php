<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../helpers/logger.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';

try {

    ValidationMiddleware::allowMethods([
        'POST',
        'PUT'
    ]);

    $user = RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    $data =
        ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        [
            'invoice_id'
        ]
    );

    $pdo = Database::getConnection();

    $stmt = $pdo->prepare(
        "UPDATE invoices
         SET payment_status = 'paid'
         WHERE id = :id"
    );

    $stmt->execute([
        ':id' => $data['invoice_id']
    ]);

    Logger::log(
        $pdo,
        $user['user_id'],
        'Invoices',
        'Invoice marked as paid'
    );

    Response::success(
        'Invoice marked as paid'
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}