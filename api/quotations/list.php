<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';

try {

    AuthMiddleware::authenticate();

    $pdo = Database::getConnection();

    $stmt = $pdo->query(
        "SELECT *
         FROM quotations
         ORDER BY created_at DESC"
    );

    Response::success(
        'Quotations fetched successfully',
        $stmt->fetchAll()
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}