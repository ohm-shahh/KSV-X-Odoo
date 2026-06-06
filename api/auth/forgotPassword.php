<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/validation.php';
require_once '../../repositories/UserRepository.php';

try {

    ValidationMiddleware::allowMethods(['POST']);

    $data = ValidationMiddleware::getJsonBody();

    ValidationMiddleware::requireFields(
        $data,
        ['email']
    );

    $repo = new UserRepository();

    $user = $repo->findByEmail(
        $data['email']
    );

    if (!$user) {
        Response::error(
            'Email not found',
            404
        );
    }

    Response::success(
        'Password reset flow initiated'
    );

} catch (Exception $e) {

    Response::error(
        $e->getMessage(),
        400
    );
}