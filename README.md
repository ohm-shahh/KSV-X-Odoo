# VendorBridge Backend

Plain PHP 8 API using MySQL/MariaDB.

The checked-in defaults match this XAMPP installation: MySQL runs on port
`3307` with user `root` and an empty password. These can be overridden with
`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`.

## Start with XAMPP

1. Start Apache and MySQL from the XAMPP Control Panel.
2. Import the schema:

```powershell
Get-Content database\schema.sql | C:\xampp\mysql\bin\mysql.exe -u root
```

3. Open:

```text
http://localhost/vendorbridge-backend/
http://localhost/vendorbridge-backend/api/health/ping.php
```

## Run without Apache

MySQL must still be running.

```powershell
C:\xampp\php\php.exe -S 127.0.0.1:8000
```

Then open `http://127.0.0.1:8000/`.

## Test registration

```powershell
$body = @{
    first_name = "Test"
    last_name = "Admin"
    email = "admin@example.com"
    password = "password123"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Uri http://localhost/vendorbridge-backend/api/auth/register.php `
    -ContentType "application/json" `
    -Body $body
```
