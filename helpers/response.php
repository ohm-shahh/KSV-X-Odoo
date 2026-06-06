<?php

class Response
{
    public static function success(
        string $message,
        $data = null,
        int $statusCode = 200
    ): void {

        http_response_code($statusCode);

        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);

        exit;
    }

    public static function error(
        string $message,
        int $statusCode = 400,
        $errors = null
    ): void {

        http_response_code($statusCode);

        echo json_encode([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ]);

        exit;
    }
}