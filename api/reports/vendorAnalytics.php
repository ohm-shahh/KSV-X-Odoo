<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';

try {

    RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    $pdo = Database::getConnection();

    $stmt = $pdo->query(
        "SELECT
            v.id,
            v.company_name,
            COUNT(q.id) AS quotations_count
         FROM vendors v
         LEFT JOIN quotations q
         ON v.id = q.vendor_id
         GROUP BY v.id
         ORDER BY quotations_count DESC"
    );

    Response::success(
        'Vendor analytics fetched',
        $stmt->fetchAll()
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}