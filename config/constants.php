<?php

class Constants
{
    /* ==========================
       APPLICATION
    ========================== */

    public const APP_NAME = 'VendorBridge';

    public const APP_VERSION = '1.0.0';

    public const BASE_URL =
        'http://localhost/vendorbridge-backend';

    /* ==========================
       JWT
    ========================== */

    public const JWT_SECRET =
        'CHANGE_THIS_TO_A_LONG_RANDOM_SECRET_KEY';

    public const JWT_EXPIRY_HOURS = 24;

    /* ==========================
       GST
    ========================== */

    public const CGST_PERCENT = 9;

    public const SGST_PERCENT = 9;

    public const TOTAL_GST_PERCENT = 18;

    /* ==========================
       USER ROLES
    ========================== */

    public const ROLE_ADMIN = 'admin';

    public const ROLE_OFFICER = 'officer';

    public const ROLE_MANAGER = 'manager';

    public const ROLE_VENDOR = 'vendor';

    /* ==========================
       USER STATUS
    ========================== */

    public const STATUS_ACTIVE = 'active';

    public const STATUS_PENDING = 'pending';

    public const STATUS_BLOCKED = 'blocked';

    /* ==========================
       RFQ STATUS
    ========================== */

    public const RFQ_DRAFT = 'draft';

    public const RFQ_PUBLISHED = 'published';

    public const RFQ_CLOSED = 'closed';

    /* ==========================
       QUOTATION STATUS
    ========================== */

    public const QUOTATION_DRAFT = 'draft';

    public const QUOTATION_SUBMITTED = 'submitted';

    public const QUOTATION_UNDER_REVIEW = 'under_review';

    public const QUOTATION_APPROVED = 'approved';

    public const QUOTATION_REJECTED = 'rejected';

    /* ==========================
       APPROVAL LEVELS
    ========================== */

    public const LEVEL_1 = 'L1_Review';

    public const LEVEL_2 = 'L2_Approval';

    /* ==========================
       APPROVAL STATUS
    ========================== */

    public const APPROVAL_PENDING = 'pending';

    public const APPROVAL_APPROVED = 'approved';

    public const APPROVAL_REJECTED = 'rejected';

    /* ==========================
       PAYMENT STATUS
    ========================== */

    public const PAYMENT_PENDING =
        'pending_payment';

    public const PAYMENT_PAID =
        'paid';

    /* ==========================
       AUDIT ACTIONS
    ========================== */

    public const LOG_RFQ = 'RFQ';

    public const LOG_APPROVAL = 'Approvals';

    public const LOG_INVOICE = 'Invoices';

    public const LOG_VENDOR = 'Vendors';

    /* ==========================
       PAGINATION
    ========================== */

    public const DEFAULT_PAGE_SIZE = 10;

    public const MAX_PAGE_SIZE = 100;
}