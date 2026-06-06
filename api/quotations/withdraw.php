<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';

try {

    RoleMiddleware::allow(['vendor']);

    if (!isset($_GET['id'])) {
        Response::error(
            'Quotation ID required',
            400
        );
    }

    $pdo = Database::getConnection();

    $stmt = $pdo->prepare(
        "UPDATE quotations
         SET status = 'withdrawn'
         WHERE id = :id"
    );

    $stmt->execute([
        ':id' => (int)$_GET['id']
    ]);

    Response::success(
        'Quotation withdrawn successfully'
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}