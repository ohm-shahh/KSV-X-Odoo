<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../middleware/validation.php';
require_once '../../services/ApprovalService.php';

try {

    ValidationMiddleware::allowMethods(['GET']);

    $user = RoleMiddleware::allow([
        'manager',
        'admin'
    ]);

    $service = new ApprovalService();

    $pendingApprovals =
        $service->pending(
            $user['user_id']
        );

    Response::success(
        'Pending approvals fetched',
        $pendingApprovals
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}