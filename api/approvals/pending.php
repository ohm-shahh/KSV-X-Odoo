<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/roleMiddleware.php';
require_once '../../services/ApprovalService.php';

$user = RoleMiddleware::allow(['manager','admin']);

$service = new ApprovalService();

Response::success(
    'Pending approvals fetched',
    $service->pending($user['user_id'])
);