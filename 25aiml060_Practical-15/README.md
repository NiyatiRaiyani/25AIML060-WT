# StudentHub — Practical 15


## Student details
- **Student ID:** 25AIML060
- **Student Name:** Niyati Raiyani
- **Department:** CSPIT — AIML
- **University:** CHARUSAT University

A responsive student portal integrating the semester's HTML, CSS, JavaScript, PHP and MySQL practical work.

## Modules
- Public home and campus events pages
- Student registration, login, logout, profile and dashboard
- Password hashing and verification with PHP
- Session regeneration and 30-minute inactivity timeout
- Role-based access for student and administrator
- Admin dashboard with live database counts
- Student account status management and search
- Event create/delete management
- JSON events API consumed by `GET /api/events.php`
- Audit log for important account/admin actions
- CSRF tokens, prepared statements, output escaping and server-side validation
- Responsive Bootstrap-based layout and keyboard skip link

## Requirements
- XAMPP (Apache, PHP 8+, MySQL/MariaDB)
- Browser
- Git

## Local installation (XAMPP)
1. Copy the `Practical-15` folder into `C:\Myxampp\htdocs\xampp\` (the folder path used in this setup).
2. Start **Apache** and **MySQL** from XAMPP Control Panel.
3. Open `http://localhost/phpmyadmin`.
4. Select the `studenthub` database (create it if needed), then import `database/studenthub.sql`. **This clean setup drops and recreates the project tables, so existing project data will be replaced.**
5. Check `config/config.php` and update DB host/name/user/password if needed. The default XAMPP settings are `127.0.0.1`, `studenthub`, `root`, blank password. `BASE_URL` is already set for `/xampp/Practical-15`.
6. Open `http://localhost/xampp/Practical-15/setup_admin.php` once to create the demo administrator.
7. **Immediately delete `setup_admin.php`** after the admin account is created.
8. Open `http://localhost/xampp/Practical-15/`.

### Demo administrator
- Email: `admin@studenthub.local`
- Password: `Admin@123`
- Change the password and remove the one-time setup script before sharing/deployment.

Students can register through the Create account page.

## Apache virtual host (optional intermediate extension)
Add this to `C:\xampp\apache\conf\extra\httpd-vhosts.conf`:

```apache
<VirtualHost *:80>
    ServerName studenthub.local
    DocumentRoot "C:/xampp/htdocs/Practical-15"
    <Directory "C:/xampp/htdocs/Practical-15">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Ensure `httpd-vhosts.conf` is included in `httpd.conf`, then add this line to the Windows hosts file (run editor as Administrator):

```text
127.0.0.1 studenthub.local
```

Update `BASE_URL` in `config/config.php` to an empty string (`''`) when using the virtual host, restart Apache and visit `http://studenthub.local/`.

## API check
Open `http://localhost/xampp/Practical-15/api/events.php`. It should return JSON with `success` and `data` fields.

## GitHub submission
Create a new public repository named `StudentHub-Practical-15`, then run these commands in this folder:

```bash
git init
git add .
git commit -m "Practical 15: integrate StudentHub portal"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/StudentHub-Practical-15.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Do not commit real passwords, private data, database exports containing real student details, or production credentials.

## Vercel deployment note
Vercel does not natively execute this PHP/MySQL application as a traditional PHP server. The static frontend can be hosted separately, but PHP login, sessions, database CRUD and the JSON API require a PHP-compatible host and MySQL database. For the complete working demo, use XAMPP locally. If publishing a frontend-only preview on Vercel, create a separate static export and clearly label backend functions as unavailable; do not expose database credentials.

## Testing
See `reports/Test_Report.md` and `reports/Security_Accessibility_Checklist.md`. Record actual pass/fail results and attach your own browser screenshots after running the project.

## Folder guide
- `config/` — database and app configuration
- `includes/` — shared bootstrap, functions, header and footer
- `admin/` — protected admin pages
- `api/` — JSON API
- `database/` — SQL schema and sample events
- `assets/` — CSS and JavaScript
- `reports/` — test report and checklists
- `screenshots/` — add your practical screenshots
