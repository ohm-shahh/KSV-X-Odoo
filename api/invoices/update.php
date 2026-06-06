<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';

try {

    $user = RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    $data = ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        [
            'invoice_id',
            'due_date'
        ]
    );

    $pdo = Database::getConnection();

    $stmt = $pdo->prepare(
        "UPDATE invoices
         SET due_date = :due_date
         WHERE id = :id"
    );

    $stmt->execute([
        ':due_date' => $data['due_date'],
        ':id' => $data['invoice_id']
    ]);

    Response::success(
        'Invoice updated successfully'
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}