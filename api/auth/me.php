<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';

try {

    $user = AuthMiddleware::authenticate();

    Response::success(
        'User fetched successfully',
        $user
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        401
    );
}