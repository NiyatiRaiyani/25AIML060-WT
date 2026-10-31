<?php
require_once __DIR__.'/includes/bootstrap.php';
$events=db()->query("SELECT title,description,event_date,venue,category FROM events WHERE status='published' ORDER BY event_date")->fetchAll();
$pageTitle='Campus events';require __DIR__.'/includes/header.php';?>
<div class="page-title"><span class="eyebrow">CAMPUS LIFE</span><h1>Explore events</h1><p>Find activities, workshops and opportunities happening around campus.</p></div>
<div class="toolbar"><input class="form-control" id="eventSearch" type="search" placeholder="Search events..." aria-label="Search events"></div>
<div class="event-grid"><?php foreach($events as $event):?><article class="event-card" data-event-card><span class="event-date"><?=e(date('d M Y',strtotime($event['event_date'])))?> · <?=e($event['category'])?></span><h3><?=e($event['title'])?></h3><p class="muted"><?=e($event['description'])?></p><small class="muted">⌖ <?=e($event['venue'])?></small></article><?php endforeach;?><?php if(!$events):?><div class="panel empty-state">No events published yet.</div><?php endif;?></div>
<?php require __DIR__.'/includes/footer.php';?>