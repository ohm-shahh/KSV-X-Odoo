<?php

require_once '../../config/cors.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';
require_once '../../middleware/validation.php';
require_once '../../repositories/QuotationRepository.php';

try {

    ValidationMiddleware::allowMethods(['GET']);

    AuthMiddleware::authenticate();

    if (!isset($_GET['rfq_id'])) {
        Response::error('RFQ ID is required', 400);
    }

    $repo = new QuotationRepository();

    $quotations = $repo->getQuotationsByRFQ(
        (int)$_GET['rfq_id']
    );

    Response::success(
        'Quotation comparison data fetched',
        $quotations
    );

} catch (Exception $e) {

    Response::error($e->getMessage(), 400);
}