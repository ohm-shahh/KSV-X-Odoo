<?php

require_once __DIR__ . '/../repositories/UserRepository.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/logger.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../config/database.php';

class AuthService
{
    private UserRepository $userRepository;
    private PDO $pdo;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
        $this->pdo = Database::getConnection();
    }

    public function register(array $data): array
    {
        if (!Validator::email($data['email'])) {
            throw new Exception("Invalid email address");
        }

        if ($this->userRepository->findByEmail($data['email'])) {
            throw new Exception("Email already exists");
        }

        $passwordHash = password_hash(
            $data['password'],
            PASSWORD_BCRYPT
        );

        $userId = $this->userRepository->createUser([
            'first_name'    => $data['first_name'],
            'last_name'     => $data['last_name'],
            'email'         => $data['email'],
            'password_hash' => $passwordHash,
            'phone_number'  => $data['phone_number'] ?? null,
            'role'          => $data['role'],
            'status'        => 'active'
        ]);

        Logger::log(
            $this->pdo,
            $userId,
            'AUTH',
            'User registered'
        );

        return [
            'user_id' => $userId,
            'email'   => $data['email']
        ];
    }

    public function login(
        string $email,
        string $password
    ): array {

        $user = $this->userRepository
            ->findByEmail($email);

        if (!$user) {
            throw new Exception(
                "Invalid credentials"
            );
        }

        if (
            !password_verify(
                $password,
                $user['password_hash']
            )
        ) {
            throw new Exception(
                "Invalid credentials"
            );
        }

        if ($user['status'] !== 'active') {
            throw new Exception(
                "Account is not active"
            );
        }

        $token = JWT::generateToken([
            'user_id' => $user['id'],
            'email'   => $user['email'],
            'role'    => $user['role']
        ]);

        Logger::log(
            $this->pdo,
            $user['id'],
            'AUTH',
            'User logged in'
        );

        return [
            'token' => $token,
            'user' => [
                'id'    => $user['id'],
                'email' => $user['email'],
                'role'  => $user['role']
            ]
        ];
    }
}