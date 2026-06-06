<?php

require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../helpers/logger.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';

try {

    ValidationMiddleware::allowMethods([
        'PUT',
        'POST'
    ]);

    $user = RoleMiddleware::allow([
        'admin',
        'officer'
    ]);

    if (!isset($_GET['id'])) {
        Response::error(
            'RFQ ID required',
            400
        );
    }

    $data =
        ValidationMiddleware::getJsonBody();

    $pdo = Database::getConnection();

    $stmt = $pdo->prepare(
        "UPDATE rfqs
         SET title = :title,
             category = :category,
             deadline = :deadline,
             description = :description
         WHERE id = :id"
    );

    $stmt->execute([
        ':title' => $data['title'],
        ':category' => $data['category'],
        ':deadline' => $data['deadline'],
        ':description' => $data['description'],
        ':id' => (int)$_GET['id']
    ]);

    Logger::log(
        $pdo,
        $user['user_id'],
        'RFQ',
        'RFQ Updated'
    );

    Response::success(
        'RFQ updated successfully'
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}