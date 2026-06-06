<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';

AuthMiddleware::authenticate();

$pdo = Database::getConnection();

$stmt = $pdo->query(
    "SELECT * FROM approvals
     ORDER BY id DESC"
);

Response::success(
    'Approval history fetched',
    $stmt->fetchAll()
);