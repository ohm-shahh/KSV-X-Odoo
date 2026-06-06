<?php

require_once __DIR__ . '/../config/constants.php';

class JWT
{
    public static function generateToken(array $payload): string
    {
        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT'
        ];

        $payload['iat'] = time();
        $payload['exp'] = time() + (Constants::JWT_EXPIRY_HOURS * 3600);

        $headerEncoded = self::base64UrlEncode(
            json_encode($header)
        );

        $payloadEncoded = self::base64UrlEncode(
            json_encode($payload)
        );

        $signature = hash_hmac(
            'sha256',
            $headerEncoded . "." . $payloadEncoded,
            Constants::JWT_SECRET,
            true
        );

        $signatureEncoded =
            self::base64UrlEncode($signature);

        return $headerEncoded . "." .
               $payloadEncoded . "." .
               $signatureEncoded;
    }

    public static function verifyToken(string $token)
    {
        $parts = explode('.', $token);

        if (count($parts) !== 3) {
            return false;
        }

        [$header, $payload, $signature] = $parts;

        $expectedSignature = self::base64UrlEncode(
            hash_hmac(
                'sha256',
                $header . "." . $payload,
                Constants::JWT_SECRET,
                true
            )
        );

        if (!hash_equals($expectedSignature, $signature)) {
            return false;
        }

        $payloadData = json_decode(
            self::base64UrlDecode($payload),
            true
        );

        if (!$payloadData) {
            return false;
        }

        if (
            isset($payloadData['exp']) &&
            time() > $payloadData['exp']
        ) {
            return false;
        }

        return $payloadData;
    }

    private static function base64UrlEncode(
        string $data
    ): string {
        return rtrim(
            strtr(base64_encode($data), '+/', '-_'),
            '='
        );
    }

    private static function base64UrlDecode(
        string $data
    ): string {
        return base64_decode(
            strtr($data, '-_', '+/')
        );
    }
}