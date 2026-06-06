<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';

RoleMiddleware::allow([
    'admin',
    'officer'
]);

$pdo = Database::getConnection();

$stmt = $pdo->prepare(
    "DELETE FROM rfqs
     WHERE id = :id"
);

$stmt->execute([
    ':id' => (int)$_GET['id']
]);

Response::success(
    'RFQ deleted'
);