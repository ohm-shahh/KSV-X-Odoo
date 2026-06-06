<?php

class Utils
{
    public static function sanitizeInput($data): string
    {
        return htmlspecialchars(
            trim($data),
            ENT_QUOTES,
            'UTF-8'
        );
    }

    public static function generateRFQNumber(): string
    {
        return 'RFQ-' .
            date('Ymd') . '-' .
            strtoupper(substr(uniqid(), -6));
    }

    public static function generateQuotationNumber(): string
    {
        return 'QTN-' .
            date('Ymd') . '-' .
            strtoupper(substr(uniqid(), -6));
    }

    public static function generatePONumber(): string
    {
        return 'PO-' .
            date('Ymd') . '-' .
            strtoupper(substr(uniqid(), -6));
    }

    public static function generateInvoiceNumber(): string
    {
        return 'INV-' .
            date('Ymd') . '-' .
            strtoupper(substr(uniqid(), -6));
    }

    public static function getJsonInput(): array
    {
        $input = json_decode(
            file_get_contents('php://input'),
            true
        );

        return is_array($input)
            ? $input
            : [];
    }

    public static function formatMoney(
        float $amount
    ): string {
        return number_format(
            $amount,
            2,
            '.',
            ''
        );
    }
}