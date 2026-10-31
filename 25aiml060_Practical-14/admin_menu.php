<?php
$role = strtolower($_SESSION["role"] ?? "");
?>

<nav class="nav nav-pills mb-4 gap-2">
    <a class="nav-link" href="admin_dashboard.php">
        Dashboard
    </a>

    <?php if ($role === "admin"): ?>
        <a class="nav-link" href="audit_log.php">
            Audit Logs
        </a>
    <?php endif; ?>

    <?php if ($role === "student"): ?>
        <a class="nav-link" href="student_dashboard.php">
            Student Dashboard
        </a>
    <?php endif; ?>
</nav>