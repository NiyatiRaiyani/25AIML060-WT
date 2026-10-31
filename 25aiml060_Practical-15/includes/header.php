<?php
$user = current_user();
$flashMessage = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="StudentHub campus portal">
<title><?= e($pageTitle ?? 'StudentHub') ?> | StudentHub</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="<?= e(url('assets/css/style.css')) ?>" rel="stylesheet">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="container nav-wrap">
<a class="brand" href="<?= e(url('index.php')) ?>"><span class="brand-mark">S</span><span>student<span class="brand-accent">hub</span></span></a>
<button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
<nav class="main-nav" aria-label="Main navigation">
<a href="<?= e(url('index.php')) ?>">Home</a><a href="<?= e(url('events.php')) ?>">Events</a>
<?php if ($user): ?>
<a href="<?= e(url('dashboard.php')) ?>">Dashboard</a>
<?php if ($user['role']==='admin'): ?><a href="<?= e(url('admin/index.php')) ?>">Admin</a><?php endif; ?>
<a class="nav-user" href="<?= e(url('profile.php')) ?>"><?= e($user['name']) ?></a>
<a class="nav-login" href="<?= e(url('logout.php')) ?>">Logout</a>
<?php else: ?>
<a href="<?= e(url('login.php')) ?>">Login</a><a class="nav-cta" href="<?= e(url('register.php')) ?>">Create account</a>
<?php endif; ?>
</nav></div></header>
<main id="main" class="container page-main">
<?php if ($flashMessage): ?><div class="alert alert-<?= e($flashMessage['type']) ?> alert-dismissible fade show" role="alert"><?= e($flashMessage['message']) ?><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div><?php endif; ?>