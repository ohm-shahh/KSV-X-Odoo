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
            'email',
            'password'
        ]
    );

    $authService = new AuthService();

    $result = $authService->login(
        $data['email'],
        $data['password']
    );

    Response::success(
        'Login successful',
        $result
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        401
    );
}