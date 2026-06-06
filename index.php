<?php

require_once 'config/cors.php';

echo json_encode([
    'success' => true,
    'application' => 'VendorBridge',
    'version' => '1.0.0',
    'message' => 'API Running'
]);