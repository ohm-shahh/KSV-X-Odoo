<?php

require_once '../../config/cors.php';

require_once '../../helpers/response.php';

require_once '../../middleware/validation.php';

require_once '../../services/AuthService.php';

try {

    ValidationMiddleware::allowMethods(['POST']);

    $data = ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        [
            'first_name',
            'last_name',
            'email',
            'password',
            'role'
        ]
    );

    $authService = new AuthService();

    $result = $authService->register($data);

    Response::success(
        'User registered successfully',
        $result,
        201
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}