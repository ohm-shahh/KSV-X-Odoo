<?php

require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';

class AuthMiddleware
{
    public static function authenticate(): array
    {
        $headers = getallheaders();

        if (
            !isset($headers['Authorization']) &&
            !isset($headers['authorization'])
        ) {
            Response::error(
                'Authorization header missing',
                401
            );
        }

        $authHeader =
            $headers['Authorization']
            ?? $headers['authorization'];

        if (
            !preg_match(
                '/Bearer\s(\S+)/',
                $authHeader,
                $matches
            )
        ) {
            Response::error(
                'Invalid token format',
                401
            );
        }

        $token = $matches[1];

        $payload = JWT::verifyToken($token);

        if (!$payload) {
            Response::error(
                'Invalid or expired token',
                401
            );
        }

        return [
            'user_id' => $payload['user_id'] ?? null,
            'email'   => $payload['email'] ?? null,
            'role'    => $payload['role'] ?? null
        ];
    }
}