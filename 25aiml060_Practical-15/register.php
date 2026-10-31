<?php
require_once __DIR__ . '/includes/bootstrap.php';
if (current_user()) redirect('dashboard.php');
$errors=[];
if ($_SERVER['REQUEST_METHOD']==='POST') {
  verify_csrf();
  $name=trim($_POST['name']??''); $email=strtolower(trim($_POST['email']??''));
  $mobile=trim($_POST['mobile']??''); $course=trim($_POST['course']??'');
  $password=$_POST['password']??''; $confirm=$_POST['confirm_password']??'';
  if (mb_strlen($name)<2 || mb_strlen($name)>100) $errors[]='Enter a name between 2 and 100 characters.';
  if (!valid_email($email)) $errors[]='Enter a valid email address.';
  if (!preg_match('/^[0-9]{10}$/',$mobile)) $errors[]='Mobile number must contain 10 digits.';
  if (strlen($password)<8) $errors[]='Password must be at least 8 characters.';
  if ($password!==$confirm) $errors[]='Passwords do not match.';
  if (!$course) $errors[]='Select your course.';
  if (!$errors) {
    $check=db()->prepare('SELECT id FROM users WHERE email=?'); $check->execute([$email]);
    if ($check->fetch()) $errors[]='This email is already registered.';
    else {
      $q=db()->prepare("INSERT INTO users(name,email,mobile,course,password_hash,role) VALUES(?,?,?,?,?,'student')");
      $q->execute([$name,$email,$mobile,$course,password_hash($password,PASSWORD_DEFAULT)]);
      $id=(int)db()->lastInsertId(); session_regenerate_id(true);
      $_SESSION['user']=['id'=>$id,'name'=>$name,'email'=>$email,'role'=>'student']; $_SESSION['last_activity']=time();
      audit('register','New student account created'); flash('success','Your account has been created. Welcome to StudentHub!'); redirect('dashboard.php');
    }
  }
}
$pageTitle='Create account'; require __DIR__.'/includes/header.php';
?>
<div class="auth-wrap"><div class="auth-card"><span class="eyebrow">JOIN STUDENTHUB</span><h1 class="mt-2">Create your account</h1><p class="muted mb-4">Start connecting with your campus community.</p>
<?php foreach($errors as $error): ?><div class="alert alert-danger"><?= e($error) ?></div><?php endforeach; ?>
<form method="post" novalidate><input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
<div class="mb-3"><label class="form-label" for="name">Full name</label><input class="form-control" id="name" name="name" required maxlength="100" value="<?= e($_POST['name']??'') ?>"></div>
<div class="mb-3"><label class="form-label" for="email">Email address</label><input class="form-control" id="email" type="email" name="email" required value="<?= e($_POST['email']??'') ?>"></div>
<div class="mb-3"><label class="form-label" for="mobile">Mobile number</label><input class="form-control" id="mobile" name="mobile" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" required value="<?= e($_POST['mobile']??'') ?>"></div>
<div class="mb-3"><label class="form-label" for="course">Course</label><select class="form-select" id="course" name="course" required><option value="">Choose course</option><?php foreach(['BCA','B.Sc IT','B.Com','BBA','MCA','Other'] as $c): ?><option <?= ($_POST['course']??'')===$c?'selected':'' ?>><?= e($c) ?></option><?php endforeach; ?></select></div>
<div class="mb-3"><label class="form-label" for="password">Password</label><input class="form-control" id="password" type="password" name="password" minlength="8" required autocomplete="new-password"></div>
<div class="mb-4"><label class="form-label" for="confirm_password">Confirm password</label><input class="form-control" id="confirm_password" type="password" name="confirm_password" required autocomplete="new-password"></div>
<button class="btn btn-primary w-100" type="submit">Create account</button></form><p class="text-center mt-4 mb-0 muted">Already registered? <a class="text-primary fw-bold" href="<?= e(url('login.php')) ?>">Sign in</a></p></div></div>
<?php require __DIR__.'/includes/footer.php'; ?>