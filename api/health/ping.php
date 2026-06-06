<?php

require_once '../../helpers/response.php';

Response::success(
    'VendorBridge API Running',
    [
        'status' => 'healthy',
        'time' => date('Y-m-d H:i:s')
    ]
);