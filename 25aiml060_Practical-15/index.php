<?php
require_once __DIR__ . '/includes/bootstrap.php';
$pageTitle = 'Welcome';
require __DIR__ . '/includes/header.php';
?>
<section class="hero">
  <div class="hero-copy">
    <span class="eyebrow">YOUR CAMPUS, CONNECTED</span>
    <h1>Learn. Connect.<br><span>Grow together.</span></h1>
    <p>StudentHub brings campus updates, student services and events together in one simple portal.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="<?= e(url('register.php')) ?>">Get started</a>
      <a class="btn btn-light" href="<?= e(url('events.php')) ?>">Explore events</a>
    </div>
    <div class="hero-note"><span class="status-dot"></span> One place for your student life</div>
  </div>
  <div class="hero-art" aria-label="StudentHub portal illustration">
    <div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div>
    <div class="art-card card-main"><div class="art-top"><span>STUDENTHUB</span><span>✦</span></div><div class="art-avatar">S</div><h3>Welcome back!</h3><p>Your campus journey starts here.</p><div class="art-stats"><div><b>12</b><small>Courses</small></div><div><b>08</b><small>Events</small></div><div><b>94%</b><small>Progress</small></div></div></div>
    <div class="float-chip chip-a">✦ Campus events</div><div class="float-chip chip-b">✓ Stay organized</div>
  </div>
</section>
<section class="section">
  <div class="section-heading"><div><span class="eyebrow">WHAT YOU CAN DO</span><h2>Everything in one hub</h2></div><p>Designed to make student and campus administration easier.</p></div>
  <div class="feature-grid">
    <article class="feature-card"><div class="feature-icon violet">▦</div><h3>Student dashboard</h3><p>View your profile and keep important student information organized.</p></article>
    <article class="feature-card"><div class="feature-icon peach">✦</div><h3>Campus events</h3><p>Discover upcoming activities, workshops and campus announcements.</p></article>
    <article class="feature-card"><div class="feature-icon mint">⌘</div><h3>Easy management</h3><p>Administrators can manage student and event records securely.</p></article>
  </div>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>