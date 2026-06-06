<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';

RoleMiddleware::allow(['admin','officer']);

$data = json_decode(
    file_get_contents('php://input'),
    true
);

$pdo = Database::getConnection();

$stmt = $pdo->prepare(
    "UPDATE purchase_orders
     SET status = :status
     WHERE id = :id"
);

$stmt->execute([
    ':status' => $data['status'],
    ':id' => $data['po_id']
]);

Response::success('PO updated');