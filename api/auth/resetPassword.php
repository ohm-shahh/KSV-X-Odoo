<?php

declare(strict_types=1);

header('Content-Type: application/json');
echo json_encode(['endpoint' => 'auth/resetPassword', 'status' => 'ok']);
