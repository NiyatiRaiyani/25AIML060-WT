<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit;
}

if (strtolower($_SESSION["role"] ?? "") !== "student") {
    header("Location: admin_dashboard.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet">
</head>

<body class="bg-light">

<div class="container py-5">
    <?php include "admin_menu.php"; ?>

    <div class="card shadow-sm">
        <div class="card-body">
            <h2>Student Dashboard</h2>
            <p>
                Welcome,
                <?= htmlspecialchars($_SESSION["name"] ?? "Student") ?>!
            </p>
            <p>You are logged in with the student role.</p>

            <a href="logout.php" class="btn btn-danger">
                Logout
            </a>
        </div>
    </div>
</div>

</body>
</html>