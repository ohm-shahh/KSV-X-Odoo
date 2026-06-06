<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';

try {

    AuthMiddleware::authenticate();

    if (!isset($_GET['id'])) {
        Response::error('Vendor ID required', 400);
    }

    $pdo = Database::getConnection();

    $stmt = $pdo->prepare(
        "SELECT v.*,
        COUNT(q.id) AS quotations_count
        FROM vendors v
        LEFT JOIN quotations q
        ON v.id = q.vendor_id
        WHERE v.id = :id
        GROUP BY v.id"
    );

    $stmt->execute([
        ':id' => (int)$_GET['id']
    ]);

    Response::success(
        'Vendor details fetched',
        $stmt->fetch()
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}