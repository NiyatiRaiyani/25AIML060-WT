
<?php
session_start();
require "db.php";

// Check login
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit;
}

// Check admin role
if (strtolower($_SESSION["role"] ?? "") !== "admin") {
    http_response_code(403);
    exit("Access Denied: Admin access required.");
}

// Record dashboard access in audit_logs
$userId = (int) $_SESSION["user_id"];
$action = "Viewed Admin Dashboard";

$log = $conn->prepare(
    "INSERT INTO audit_logs (user_id, action) VALUES (?, ?)"
);

if (!$log) {
    die("Audit Log SQL Error: " . $conn->error);
}

$log->bind_param("is", $userId, $action);

if (!$log->execute()) {
    die("Audit Log Execution Error: " . $log->error);
}

$log->close();


// Function to fetch total counts
function getCount($conn, $table) {
    $allowedTables = [
        "users",
        "students",
        "events",
        "registrations"
    ];

    if (!in_array($table, $allowedTables, true)) {
        return 0;
    }

    $result = $conn->query(
        "SELECT COUNT(*) AS total FROM `$table`"
    );

    if (!$result) {
        return 0;
    }

    $row = $result->fetch_assoc();

    return (int) $row["total"];
}


// Dashboard statistics
$totalUsers = getCount($conn, "users");
$totalStudents = getCount($conn, "students");
$totalEvents = getCount($conn, "events");
$totalRegistrations = getCount($conn, "registrations");


// Latest registrations
$latest = $conn->query(
    "SELECT r.id,
            s.name AS student_name,
            e.title AS event_title,
            r.registered_at
     FROM registrations r
     LEFT JOIN students s ON r.student_id = s.id
     LEFT JOIN events e ON r.event_id = e.id
     ORDER BY r.id DESC
     LIMIT 5"
);

if (!$latest) {
    die("Registration Query Error: " . $conn->error);
}


// Safe output function
function e($value) {
    return htmlspecialchars(
        (string) $value,
        ENT_QUOTES,
        "UTF-8"
    );
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Admin Dashboard - StudentHub</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">
</head>

<body class="bg-light">

<nav class="navbar navbar-dark bg-dark px-4">

    <a class="navbar-brand" href="admin_dashboard.php">
        StudentHub Admin
    </a>

    <div class="text-white">
        Welcome, <?= e($_SESSION["name"] ?? "Admin") ?>

        <a href="logout.php"
           class="btn btn-danger btn-sm ms-3">
            Logout
        </a>
    </div>

</nav>


<div class="container py-4">

    <h2 class="mb-4">Admin Dashboard</h2>

    <?php include "admin_menu.php"; ?>


    <!-- Statistics Cards -->

    <div class="row g-3">

        <div class="col-md-3">
            <div class="card text-bg-primary shadow-sm">
                <div class="card-body">
                    <h5>Total Users</h5>
                    <h2><?= $totalUsers ?></h2>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card text-bg-success shadow-sm">
                <div class="card-body">
                    <h5>Total Students</h5>
                    <h2><?= $totalStudents ?></h2>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card text-bg-warning shadow-sm">
                <div class="card-body">
                    <h5>Total Events</h5>
                    <h2><?= $totalEvents ?></h2>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card text-bg-info shadow-sm">
                <div class="card-body">
                    <h5>Total Registrations</h5>
                    <h2><?= $totalRegistrations ?></h2>
                </div>
            </div>
        </div>

    </div>


    <!-- Latest Registrations -->

    <div class="card mt-4 shadow-sm">

        <div class="card-header bg-dark text-white">
            Latest Registrations
        </div>

        <div class="card-body table-responsive">

            <table class="table table-bordered table-striped">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Event Name</th>
                        <th>Registration Date</th>
                    </tr>
                </thead>

                <tbody>

                <?php if ($latest->num_rows > 0): ?>

                    <?php while ($row = $latest->fetch_assoc()): ?>

                        <tr>
                            <td><?= e($row["id"]) ?></td>

                            <td>
                                <?= e($row["student_name"] ?? "N/A") ?>
                            </td>

                            <td>
                                <?= e($row["event_title"] ?? "N/A") ?>
                            </td>

                            <td>
                                <?= e($row["registered_at"]) ?>
                            </td>
                        </tr>

                    <?php endwhile; ?>

                <?php else: ?>

                    <tr>
                        <td colspan="4" class="text-center">
                            No registrations found.
                        </td>
                    </tr>

                <?php endif; ?>

                </tbody>

            </table>

        </div>

    </div>


    <!-- Audit Logs Button -->

    <div class="mt-4">
        <a href="audit_log.php"
           class="btn btn-secondary">
            View Audit Logs
        </a>
    </div>

</div>

</body>
</html>
