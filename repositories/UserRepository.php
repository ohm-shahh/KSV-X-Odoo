<?php

require_once __DIR__ . '/../config/database.php';

class UserRepository
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
    }

    public function createUser(array $data): int
    {
        $sql = "
            INSERT INTO users
            (
                first_name,
                last_name,
                email,
                password_hash,
                phone_number,
                role,
                status
            )
            VALUES
            (
                :first_name,
                :last_name,
                :email,
                :password_hash,
                :phone_number,
                :role,
                :status
            )
        ";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':first_name'   => $data['first_name'],
            ':last_name'    => $data['last_name'],
            ':email'        => $data['email'],
            ':password_hash'=> $data['password_hash'],
            ':phone_number' => $data['phone_number'] ?? null,
            ':role'         => $data['role'],
            ':status'       => $data['status'] ?? 'active'
        ]);

        return (int)$this->pdo->lastInsertId();
    }

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM users WHERE email = :email LIMIT 1"
        );

        $stmt->execute([
            ':email' => $email
        ]);

        $user = $stmt->fetch();

        return $user ?: null;
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM users WHERE id = :id LIMIT 1"
        );

        $stmt->execute([
            ':id' => $id
        ]);

        $user = $stmt->fetch();

        return $user ?: null;
    }

    public function updateStatus(
        int $userId,
        string $status
    ): bool {

        $stmt = $this->pdo->prepare(
            "UPDATE users
             SET status = :status
             WHERE id = :id"
        );

        return $stmt->execute([
            ':status' => $status,
            ':id' => $userId
        ]);
    }

    public function deleteUser(
        int $userId
    ): bool {

        $stmt = $this->pdo->prepare(
            "DELETE FROM users WHERE id = :id"
        );

        return $stmt->execute([
            ':id' => $userId
        ]);
    }
}