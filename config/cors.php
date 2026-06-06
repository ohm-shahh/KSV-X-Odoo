<?php

// Allow requests from frontend
header("Access-Control-Allow-Origin: *");

// Allowed methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allowed headers
header(
    "Access-Control-Allow-Headers: Content-Type, Authorization"
);

// Response type
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);

    echo json_encode([
        "success" => true,
        "message" => "Preflight request accepted"
    ]);

    exit;
}