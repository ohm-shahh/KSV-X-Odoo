<?php

class Validator
{
    public static function required($value): bool
    {
        return isset($value) &&
               trim((string)$value) !== '';
    }

    public static function email(string $email): bool
    {
        return filter_var(
            $email,
            FILTER_VALIDATE_EMAIL
        ) !== false;
    }

    public static function positiveNumber($number): bool
    {
        return is_numeric($number)
            && $number > 0;
    }

    public static function nonNegativeNumber($number): bool
    {
        return is_numeric($number)
            && $number >= 0;
    }

    public static function stringLength(
        string $value,
        int $min,
        int $max
    ): bool {

        $length = strlen(trim($value));

        return $length >= $min
            && $length <= $max;
    }

    public static function validDate(
        string $date
    ): bool {

        return strtotime($date) !== false;
    }

    public static function futureDate(
        string $date
    ): bool {

        return strtotime($date) >
               strtotime(date('Y-m-d'));
    }

    public static function role(
        string $role
    ): bool {

        $allowedRoles = [
            'admin',
            'officer',
            'manager',
            'vendor'
        ];

        return in_array(
            $role,
            $allowedRoles,
            true
        );
    }

    public static function gstin(
        string $gstin
    ): bool {

        return preg_match(
            '/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/',
            strtoupper($gstin)
        ) === 1;
    }
}