<?php
require_once __DIR__.'/../includes/bootstrap.php';require_admin();
$logs=db()->query('SELECT a.action,a.details,a.ip_address,a.created_at,u.name FROM audit_logs a LEFT JOIN users u ON u.id=a.user_id ORDER BY a.created_at DESC LIMIT 100')->fetchAll();
$pageTitle='Audit log';require __DIR__.'/../includes/header.php';?>
<div class="page-title"><span class="eyebrow">SECURITY & TRACEABILITY</span><h1>Audit log</h1><p>Recent account and administrative actions.</p></div><div class="admin-menu"><a href="<?=e(url('admin/index.php'))?>">← Dashboard</a></div>
<div class="panel"><div class="table-responsive"><table class="table"><thead><tr><th>User</th><th>Action</th><th>Details</th><th>Date</th></tr></thead><tbody><?php foreach($logs as $l):?><tr><td><?=e($l['name']??'Unknown')?></td><td><?=e($l['action'])?></td><td><?=e($l['details'])?></td><td><?=e(date('d M Y H:i',strtotime($l['created_at'])))?></td></tr><?php endforeach;?></tbody></table></div></div>
<?php require __DIR__.'/../includes/footer.php';?>