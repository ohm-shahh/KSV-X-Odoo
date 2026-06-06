CREATE DATABASE IF NOT EXISTS vendorbridge
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE vendorbridge;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(30) NULL,
    role VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_role (role),
    INDEX idx_users_status (status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    gstin VARCHAR(15) NOT NULL UNIQUE,
    category VARCHAR(150) NOT NULL,
    contact_details TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_vendors_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rfqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rfq_number VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(150) NOT NULL,
    deadline DATE NOT NULL,
    description TEXT NOT NULL,
    created_by INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_rfqs_created_by
        FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_rfqs_status (status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rfq_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rfq_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    quantity DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rfq_items_rfq
        FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rfq_vendors (
    rfq_id INT NOT NULL,
    vendor_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (rfq_id, vendor_id),
    CONSTRAINT fk_rfq_vendors_rfq
        FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE,
    CONSTRAINT fk_rfq_vendors_vendor
        FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS quotations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quotation_number VARCHAR(50) NOT NULL UNIQUE,
    rfq_id INT NOT NULL,
    vendor_id INT NOT NULL,
    delivery_days INT UNSIGNED NOT NULL,
    subtotal DECIMAL(15, 2) NOT NULL,
    cgst DECIMAL(15, 2) NOT NULL,
    sgst DECIMAL(15, 2) NOT NULL,
    grand_total DECIMAL(15, 2) NOT NULL,
    note TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_quotations_rfq
        FOREIGN KEY (rfq_id) REFERENCES rfqs(id),
    CONSTRAINT fk_quotations_vendor
        FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    INDEX idx_quotations_rfq (rfq_id),
    INDEX idx_quotations_status (status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS quotation_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quotation_id INT NOT NULL,
    rfq_item_id INT NOT NULL,
    unit_price DECIMAL(15, 2) NOT NULL,
    total_price DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_quotation_items_quotation
        FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE,
    CONSTRAINT fk_quotation_items_rfq_item
        FOREIGN KEY (rfq_item_id) REFERENCES rfq_items(id),
    UNIQUE KEY uq_quotation_rfq_item (quotation_id, rfq_item_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS approvals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quotation_id INT NOT NULL,
    level VARCHAR(30) NOT NULL,
    assigned_manager_id INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    remarks TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_approvals_quotation
        FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE,
    CONSTRAINT fk_approvals_manager
        FOREIGN KEY (assigned_manager_id) REFERENCES users(id),
    UNIQUE KEY uq_approval_level (quotation_id, level),
    INDEX idx_approvals_manager_status (assigned_manager_id, status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS purchase_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    po_number VARCHAR(50) NOT NULL UNIQUE,
    quotation_id INT NOT NULL UNIQUE,
    vendor_id INT NOT NULL,
    po_date DATE NOT NULL,
    subtotal DECIMAL(15, 2) NOT NULL,
    cgst DECIMAL(15, 2) NOT NULL,
    sgst DECIMAL(15, 2) NOT NULL,
    grand_total DECIMAL(15, 2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'generated',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_purchase_orders_quotation
        FOREIGN KEY (quotation_id) REFERENCES quotations(id),
    CONSTRAINT fk_purchase_orders_vendor
        FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    INDEX idx_purchase_orders_status (status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    po_id INT NOT NULL UNIQUE,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    payment_status VARCHAR(30) NOT NULL DEFAULT 'pending_payment',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_invoices_po
        FOREIGN KEY (po_id) REFERENCES purchase_orders(id),
    INDEX idx_invoices_payment_status (payment_status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action_type VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_logs_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_audit_logs_created_at (created_at)
) ENGINE=InnoDB;
