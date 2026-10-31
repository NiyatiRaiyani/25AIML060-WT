<?php
require_once __DIR__ . '/includes/bootstrap.php';
if (current_user()) redirect('dashboard.php');
$error='';
if ($_SERVER['REQUEST_METHOD']==='POST') {
  verify_csrf(); $email=strtolower(trim($_POST['email']??'')); $password=$_POST['password']??'';
  $q=db()->prepare('SELECT id,name,email,password_hash,role,status FROM users WHERE email=? LIMIT 1'); $q->execute([$email]); $user=$q->fetch();
  if ($user && $user['status']==='active' && password_verify($password,$user['password_hash'])) {
    session_regenerate_id(true); $_SESSION['user']=['id'=>(int)$user['id'],'name'=>$user['name'],'email'=>$user['email'],'role'=>$user['role']]; $_SESSION['last_activity']=time();
    db()->prepare('UPDATE users SET last_login=NOW() WHERE id=?')->execute([$user['id']]); audit('login','Successful login');
    flash('success','Welcome back, '.$user['name'].'!'); redirect($user['role']==='admin'?'admin/index.php':'dashboard.php');
  } else { $error='Invalid email or password, or account is inactive.'; }
}
$pageTitle='Login'; require __DIR__.'/includes/header.php';
?>
<div class="auth-wrap"><div class="auth-card"><span class="eyebrow">WELCOME BACK</span><h1 class="mt-2">Sign in to StudentHub</h1><p class="muted mb-4">Access your campus dashboard.</p>
<?php if($error): ?><div class="alert alert-danger"><?= e($error) ?></div><?php endif; ?>
<form method="post"><input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>"><div class="mb-3"><label class="form-label" for="email">Email address</label><input class="form-control" id="email" type="email" name="email" required autocomplete="username" value="<?= e($_POST['email']??'') ?>"></div><div class="mb-4"><label class="form-label" for="password">Password</label><input class="form-control" id="password" type="password" name="password" required autocomplete="current-password"></div><button class="btn btn-primary w-100">Login</button></form><p class="text-center mt-4 mb-0 muted">New here? <a class="text-primary fw-bold" href="<?= e(url('register.php')) ?>">Create an account</a></p></div></div>
<?php require __DIR__.'/includes/footer.php'; ?>