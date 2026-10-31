<?php
require_once __DIR__.'/../includes/bootstrap.php';require_admin();
$students=(int)db()->query("SELECT COUNT(*) FROM users WHERE role='student'")->fetchColumn();
$admins=(int)db()->query("SELECT COUNT(*) FROM users WHERE role='admin'")->fetchColumn();
$events=(int)db()->query("SELECT COUNT(*) FROM events")->fetchColumn();
$latest=db()->query("SELECT name,email,created_at FROM users ORDER BY created_at DESC LIMIT 6")->fetchAll();
$pageTitle='Admin dashboard';require __DIR__.'/../includes/header.php';?>
<div class="page-title"><span class="eyebrow">CONTROL CENTER</span><h1>Admin dashboard</h1><p>Monitor your StudentHub portal and manage campus information.</p></div>
<div class="admin-menu"><a href="<?=e(url('admin/students.php'))?>">Manage students</a><a href="<?=e(url('admin/events.php'))?>">Manage events</a><a href="<?=e(url('admin/audit.php'))?>">Audit log</a></div>
<div class="stat-grid"><div class="stat-card"><small>Students</small><strong><?=$students?></strong></div><div class="stat-card"><small>Administrators</small><strong><?=$admins?></strong></div><div class="stat-card"><small>Total events</small><strong><?=$events?></strong></div></div>
<div class="panel"><h2 class="h5 mb-3">Latest registrations</h2><div class="table-responsive"><table class="table"><thead><tr><th>Name</th><th>Email</th><th>Joined</th></tr></thead><tbody><?php foreach($latest as $u):?><tr><td><?=e($u['name'])?></td><td><?=e($u['email'])?></td><td><?=e(date('d M Y',strtotime($u['created_at'])))?></td></tr><?php endforeach;?></tbody></table></div></div>
<?php require __DIR__.'/../includes/footer.php';?>