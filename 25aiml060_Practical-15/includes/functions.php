<?php
function e($value): string { return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8'); }
function url(string $path=''): string { return rtrim(BASE_URL, '/') . '/' . ltrim($path, '/'); }
function redirect(string $path): never { header('Location: ' . url($path)); exit; }
function flash(string $type, string $message): void { $_SESSION['flash'] = ['type'=>$type, 'message'=>$message]; }
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}
function verify_csrf(): void {
    $token = $_POST['csrf_token'] ?? '';
    if (!is_string($token) || !hash_equals($_SESSION['csrf'] ?? '', $token)) {
        http_response_code(419); exit('Invalid or expired form token. Go back and try again.');
    }
}
function current_user(): ?array { return $_SESSION['user'] ?? null; }
function require_login(): void { if (!current_user()) { flash('warning','Please sign in to continue.'); redirect('login.php'); } }
function require_admin(): void {
    require_login();
    if ((current_user()['role'] ?? '') !== 'admin') { http_response_code(403); exit('403 - Admin access required.'); }
}
function audit(string $action, string $details=''): void {
    if (!current_user()) return;
    try {
        $q = db()->prepare('INSERT INTO audit_logs (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)');
        $q->execute([current_user()['id'], $action, $details, $_SERVER['REMOTE_ADDR'] ?? '']);
    } catch (Throwable $e) { /* audit logging must not break the user workflow */ }
}
function valid_email(string $email): bool { return (bool)filter_var($email, FILTER_VALIDATE_EMAIL); }