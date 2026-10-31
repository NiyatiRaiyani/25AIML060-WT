<?php
// Run once after importing database/studenthub.sql, then DELETE this file.
require_once __DIR__.'/includes/bootstrap.php';
$email='admin@studenthub.local'; $password='Admin@123';
$q=db()->prepare('SELECT id FROM users WHERE email=?');$q->execute([$email]);
if($q->fetch()){exit('Admin account already exists. Delete setup_admin.php now.');}
$ins=db()->prepare("INSERT INTO users(name,email,mobile,course,password_hash,role,status) VALUES(?,?,?,?,?,'admin','active')");
$ins->execute(['StudentHub Admin',$email,'9999999999','Administration',password_hash($password,PASSWORD_DEFAULT)]);
echo 'Admin created. Email: '.htmlspecialchars($email).' Password: '.htmlspecialchars($password).'. DELETE setup_admin.php immediately.';
