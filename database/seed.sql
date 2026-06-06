-- VendorBridge demo seed data.
-- Safe to run multiple times: it clears its own SEED-* rows first, then re-inserts.
-- Login users created below all share the password:  password123
--
--   admin@vendorbridge.test     (admin)
--   officer@vendorbridge.test   (officer)
--   manager@vendorbridge.test   (manager)
--   vendor@vendorbridge.test    (vendor)
--
-- Import with:
--   Get-Content database\seed.sql | C:\xampp\mysql\bin\mysql.exe -u root -P 3307 vendorbridge

USE vendorbridge;

/* ------------------------------------------------------------------ *
 * 0) Clear previously seeded demo rows (child -> parent order).
 * ------------------------------------------------------------------ */
DELETE FROM invoices         WHERE invoice_number LIKE 'INV-SEED-%';
DELETE FROM purchase_orders  WHERE po_number      LIKE 'PO-SEED-%';
DELETE FROM approvals        WHERE quotation_id IN (SELECT id FROM (SELECT id FROM quotations WHERE quotation_number LIKE 'QTN-SEED-%') AS q);
DELETE FROM quotation_items  WHERE quotation_id IN (SELECT id FROM (SELECT id FROM quotations WHERE quotation_number LIKE 'QTN-SEED-%') AS q);
DELETE FROM quotations       WHERE quotation_number LIKE 'QTN-SEED-%';
DELETE FROM rfq_vendors      WHERE rfq_id IN (SELECT id FROM (SELECT id FROM rfqs WHERE rfq_number LIKE 'RFQ-SEED-%') AS r);
DELETE FROM rfq_items        WHERE rfq_id IN (SELECT id FROM (SELECT id FROM rfqs WHERE rfq_number LIKE 'RFQ-SEED-%') AS r);
DELETE FROM rfqs             WHERE rfq_number LIKE 'RFQ-SEED-%';

/* ------------------------------------------------------------------ *
 * 1) Known-credential users (password for all: password123)
 * ------------------------------------------------------------------ */
INSERT INTO users (first_name, last_name, email, password_hash, phone_number, role, status) VALUES
 ('Aarav', 'Admin',   'admin@vendorbridge.test',   '$2y$10$f3CcD3x9nadH16C6aapDVu//c7Y.L50tFOGjaD60gvysrr8rGIwM.', '+91 90000 00001', 'admin',   'active'),
 ('Olivia','Officer', 'officer@vendorbridge.test', '$2y$10$f3CcD3x9nadH16C6aapDVu//c7Y.L50tFOGjaD60gvysrr8rGIwM.', '+91 90000 00002', 'officer', 'active'),
 ('Manish','Manager', 'manager@vendorbridge.test', '$2y$10$f3CcD3x9nadH16C6aapDVu//c7Y.L50tFOGjaD60gvysrr8rGIwM.', '+91 90000 00003', 'manager', 'active'),
 ('Vikram','Vendor',  'vendor@vendorbridge.test',  '$2y$10$f3CcD3x9nadH16C6aapDVu//c7Y.L50tFOGjaD60gvysrr8rGIwM.', '+91 90000 00004', 'vendor',  'active'),
 ('Tara',  'TechCore','techcore@vendorbridge.test','$2y$10$f3CcD3x9nadH16C6aapDVu//c7Y.L50tFOGjaD60gvysrr8rGIwM.', '+91 90000 00005', 'vendor',  'active')
ON DUPLICATE KEY UPDATE
  first_name    = VALUES(first_name),
  last_name     = VALUES(last_name),
  password_hash = VALUES(password_hash),
  phone_number  = VALUES(phone_number),
  role          = VALUES(role),
  status        = 'active';

SET @admin_id    = (SELECT id FROM users WHERE email = 'admin@vendorbridge.test');
SET @officer_id  = (SELECT id FROM users WHERE email = 'officer@vendorbridge.test');
SET @manager_id  = (SELECT id FROM users WHERE email = 'manager@vendorbridge.test');
SET @vendor_uid  = (SELECT id FROM users WHERE email = 'vendor@vendorbridge.test');
SET @vendor2_uid = (SELECT id FROM users WHERE email = 'techcore@vendorbridge.test');

/* ------------------------------------------------------------------ *
 * 2) Vendor profiles
 * ------------------------------------------------------------------ */
INSERT INTO vendors (user_id, company_name, gstin, category, contact_details) VALUES
 (@vendor_uid,  'Infra Supplies Pvt Ltd', '27AABCS1429B1Z0', 'Furniture', '+91 98765 43210 | 456 Industrial Estate, Surat'),
 (@vendor2_uid, 'TechCore Solutions',     '24AABCS9811M1Z2', 'IT',        '+91 99123 45678 | Tech Park, Ahmedabad')
ON DUPLICATE KEY UPDATE
  company_name    = VALUES(company_name),
  category        = VALUES(category),
  contact_details = VALUES(contact_details);

SET @vendor_id  = (SELECT id FROM vendors WHERE gstin = '27AABCS1429B1Z0');
SET @vendor2_id = (SELECT id FROM vendors WHERE gstin = '24AABCS9811M1Z2');

/* ------------------------------------------------------------------ *
 * 3) RFQ + line items + vendor assignment
 * ------------------------------------------------------------------ */
INSERT INTO rfqs (rfq_number, title, category, deadline, description, created_by, status)
VALUES ('RFQ-SEED-0001', 'Office Furniture Procurement Q2', 'Furniture',
        DATE_ADD(CURDATE(), INTERVAL 30 DAY),
        'Ergonomic chairs and standing desks for the 3rd floor refit.',
        @officer_id, 'published');

SET @rfq_id = (SELECT id FROM rfqs WHERE rfq_number = 'RFQ-SEED-0001');

INSERT INTO rfq_items (rfq_id, item_name, quantity) VALUES
 (@rfq_id, 'Ergonomic Chair', 25),
 (@rfq_id, 'Standing Desk',   10);

SET @item1_id = (SELECT id FROM rfq_items WHERE rfq_id = @rfq_id AND item_name = 'Ergonomic Chair' LIMIT 1);
SET @item2_id = (SELECT id FROM rfq_items WHERE rfq_id = @rfq_id AND item_name = 'Standing Desk'   LIMIT 1);

INSERT INTO rfq_vendors (rfq_id, vendor_id) VALUES
 (@rfq_id, @vendor_id),
 (@rfq_id, @vendor2_id);

/* ------------------------------------------------------------------ *
 * 4) Quotations (two competing submissions for comparison)
 *    GST = 18% (CGST 9% + SGST 9%).
 * ------------------------------------------------------------------ */
INSERT INTO quotations (quotation_number, rfq_id, vendor_id, delivery_days, subtotal, cgst, sgst, grand_total, note, status)
VALUES ('QTN-SEED-0001', @rfq_id, @vendor_id, 10, 169500.00, 15255.00, 15255.00, 200010.00, 'Payment terms: Net 20 days.', 'submitted');
SET @quotation_id = (SELECT id FROM quotations WHERE quotation_number = 'QTN-SEED-0001');
INSERT INTO quotation_items (quotation_id, rfq_item_id, unit_price, total_price) VALUES
 (@quotation_id, @item1_id, 3500.00, 87500.00),
 (@quotation_id, @item2_id, 8200.00, 82000.00);

INSERT INTO quotations (quotation_number, rfq_id, vendor_id, delivery_days, subtotal, cgst, sgst, grand_total, note, status)
VALUES ('QTN-SEED-0002', @rfq_id, @vendor2_id, 14, 156000.00, 14040.00, 14040.00, 184080.00, 'Bulk discount applied.', 'submitted');
SET @quotation2_id = (SELECT id FROM quotations WHERE quotation_number = 'QTN-SEED-0002');
INSERT INTO quotation_items (quotation_id, rfq_item_id, unit_price, total_price) VALUES
 (@quotation2_id, @item1_id, 3200.00, 80000.00),
 (@quotation2_id, @item2_id, 7600.00, 76000.00);

/* ------------------------------------------------------------------ *
 * 5) Pending approval assigned to the demo manager
 *    (so the Approvals page is populated after logging in as manager).
 * ------------------------------------------------------------------ */
INSERT INTO approvals (quotation_id, level, assigned_manager_id, status, remarks)
VALUES (@quotation_id, 'L2_Approval', @manager_id, 'pending', 'Awaiting finance sign-off.');

/* ------------------------------------------------------------------ *
 * 6) An already-approved quotation -> PO -> invoice chain
 *    (so Purchase Orders and Invoices pages show data).
 * ------------------------------------------------------------------ */
INSERT INTO quotations (quotation_number, rfq_id, vendor_id, delivery_days, subtotal, cgst, sgst, grand_total, note, status)
VALUES ('QTN-SEED-0003', @rfq_id, @vendor2_id, 12, 120000.00, 10800.00, 10800.00, 141600.00, 'Approved batch order.', 'approved');
SET @quotation3_id = (SELECT id FROM quotations WHERE quotation_number = 'QTN-SEED-0003');

INSERT INTO purchase_orders (po_number, quotation_id, vendor_id, po_date, subtotal, cgst, sgst, grand_total, status)
VALUES ('PO-SEED-0001', @quotation3_id, @vendor2_id, CURDATE(), 120000.00, 10800.00, 10800.00, 141600.00, 'generated');
SET @po_id = (SELECT id FROM purchase_orders WHERE po_number = 'PO-SEED-0001');

INSERT INTO invoices (invoice_number, po_id, invoice_date, due_date, payment_status)
VALUES ('INV-SEED-0001', @po_id, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'pending_payment');

/* ------------------------------------------------------------------ *
 * 7) A few audit-log entries
 * ------------------------------------------------------------------ */
INSERT INTO audit_logs (user_id, action_type, details) VALUES
 (@officer_id, 'RFQ',       'RFQ-SEED-0001 published to 2 vendors'),
 (@vendor_uid, 'RFQ',       'Quotation QTN-SEED-0001 submitted for RFQ-SEED-0001'),
 (@manager_id, 'Approvals', 'L2 approval pending for QTN-SEED-0001'),
 (@officer_id, 'Invoices',  'Invoice INV-SEED-0001 raised against PO-SEED-0001');

SELECT 'Seed complete. Login with any *@vendorbridge.test / password123' AS status;
