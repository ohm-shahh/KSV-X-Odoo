<?php

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../helpers/response.php';

class RoleMiddleware
{
    public static function allow(array $allowedRoles): array
    {
        $user = AuthMiddleware::authenticate();

        if (
            !in_array(
                $user['role'],
                $allowedRoles,
                true
            )
        ) {
            Response::error(
                'Access denied. Insufficient permissions.',
                403
            );
        }

        return $user;
    }

    public static function admin(): array
    {
        return self::allow(['admin']);
    }

    public static function officer(): array
    {
        return self::allow(['officer']);
    }

    public static function manager(): array
    {
        return self::allow(['manager']);
    }

    public static function vendor(): array
    {
        return self::allow(['vendor']);
    }
}