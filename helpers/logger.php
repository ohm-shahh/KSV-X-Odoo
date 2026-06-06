<?php

class Logger
{
    public static function log(
        PDO $pdo,
        ?int $userId,
        string $actionType,
        string $details
    ): bool {

        try {

            $query = "
                INSERT INTO audit_logs
                (
                    user_id,
                    action_type,
                    details
                )
                VALUES
                (
                    :user_id,
                    :action_type,
                    :details
                )
            ";

            $stmt = $pdo->prepare($query);

            return $stmt->execute([
                ':user_id' => $userId,
                ':action_type' => $actionType,
                ':details' => $details
            ]);

        } catch (PDOException $e) {

            error_log(
                'Audit Log Error: ' .
                $e->getMessage()
            );

            return false;
        }
    }
}