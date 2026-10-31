<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit;
}

$role = $_SESSION["role"];

$menus = [
    "admin" => [
        "Dashboard" => "admin.php",
        "Audit Logs" => "audit.php",
        "Logout" => "logout.php"
    ],
    "student" => [
        "Student Home" => "menu.php",
        "View Events" => "events.php",
        "Logout" => "logout.php"
    ]
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>StudentHub Menu</title>
</head>
<body>

<h2>StudentHub</h2>

<p>
    Welcome, <?php echo htmlspecialchars($_SESSION["name"]); ?>
</p>

<p>
    Role: <?php echo htmlspecialchars($role); ?>
</p>

<h3>Menu Options</h3>

<?php foreach ($menus[$role] as $label => $url): ?>
    <p>
        <a href="<?php echo htmlspecialchars($url); ?>">
            <?php echo htmlspecialchars($label); ?>
        </a>
    </p>
<?php endforeach; ?>

</body>
</html>