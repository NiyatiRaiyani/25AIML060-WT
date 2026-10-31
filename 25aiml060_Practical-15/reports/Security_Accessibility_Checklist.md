# Security & Accessibility Checklist

Mark each item after checking the running application.

## Security
- [ ] Passwords stored with `password_hash()` and checked with `password_verify()`.
- [ ] SQL queries use PDO prepared statements.
- [ ] Output is escaped with `htmlspecialchars()`.
- [ ] Forms validate input on the server.
- [ ] POST forms include CSRF tokens.
- [ ] Session ID is regenerated after successful login.
- [ ] Session inactivity timeout is enabled.
- [ ] Admin pages verify the admin role server-side.
- [ ] Inactive student accounts cannot log in.
- [ ] One-time `setup_admin.php` has been deleted after use.
- [ ] Demo password has been changed before any public deployment.
- [ ] No real credentials or private student data are committed to GitHub.

## Accessibility
- [ ] Semantic header, nav, main and footer landmarks are present.
- [ ] A skip-to-content link is available.
- [ ] Form controls have visible labels.
- [ ] Navigation toggle exposes `aria-expanded`.
- [ ] Keyboard focus is visible.
- [ ] Text and controls have sufficient contrast.
- [ ] Pages are usable at mobile, tablet and desktop widths.
- [ ] Status and error messages are readable and not conveyed by colour alone.

## Deployment
- [ ] Apache and MySQL start successfully in XAMPP.
- [ ] SQL file imports without errors.
- [ ] Database configuration matches local environment.
- [ ] Home, login, dashboard, admin and API routes work.
- [ ] README installation instructions have been followed.
