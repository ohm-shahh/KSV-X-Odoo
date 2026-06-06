<?php

require_once __DIR__ . '/../helpers/response.php';

class ValidationMiddleware
{
    public static function allowMethods(array $methods): void
    {
        if (!in_array($_SERVER['REQUEST_METHOD'], $methods, true)) {

            Response::error(
                'Method Not Allowed',
                405
            );
        }
    }

    public static function getJsonBody(): array
    {
        $input = json_decode(
            file_get_contents('php://input'),
            true
        );

        if (!$input) {

            Response::error(
                'Invalid JSON payload',
                400
            );
        }

        return $input;
    }

    public static function requireFields(
        array $data,
        array $fields
    ): void {

        $missing = [];

        foreach ($fields as $field) {

            if (
                !isset($data[$field]) ||
                trim((string)$data[$field]) === ''
            ) {
                $missing[] = $field;
            }
        }

        if (!empty($missing)) {

            Response::error(
                'Required fields missing',
                400,
                $missing
            );
        }
    }
}