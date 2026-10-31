<?php
$conn = mysqli_connect("localhost", "root", "", "college1");

if (!$conn) {
    die("Database connection failed.");
}

$msg = "";
$edit = null;

/* ADD AND UPDATE STUDENT */
if (isset($_POST["save"])) {
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $course = $_POST["course"] ?? "";
    $id = $_POST["id"] ?? "";

    if ($id === "") {
        $stmt = mysqli_prepare(
            $conn,
            "INSERT INTO students (name, email, course)
             VALUES (?, ?, ?)"
        );

        mysqli_stmt_bind_param(
            $stmt, "sss", $name, $email, $course
        );

        $msg = mysqli_stmt_execute($stmt)
            ? "Student added successfully!"
            : "Failed to add student.";

        mysqli_stmt_close($stmt);
    } else {
        $studentId = (int)$id;

        $stmt = mysqli_prepare(
            $conn,
            "UPDATE students
             SET name = ?, email = ?, course = ?
             WHERE id = ?"
        );

        mysqli_stmt_bind_param(
            $stmt, "sssi", $name, $email, $course, $studentId
        );

        $msg = mysqli_stmt_execute($stmt)
            ? "Student updated successfully!"
            : "Failed to update student.";

        mysqli_stmt_close($stmt);
    }
}

/* DELETE STUDENT */
if (isset($_GET["delete"])) {
    $studentId = (int)$_GET["delete"];

    $stmt = mysqli_prepare(
        $conn,
        "DELETE FROM students WHERE id = ?"
    );

    mysqli_stmt_bind_param($stmt, "i", $studentId);

    $msg = mysqli_stmt_execute($stmt)
        ? "Student deleted successfully!"
        : "Failed to delete student.";

    mysqli_stmt_close($stmt);
}

/* FETCH STUDENT FOR EDITING */
if (isset($_GET["edit"])) {
    $studentId = (int)$_GET["edit"];

    $stmt = mysqli_prepare(
        $conn,
        "SELECT id, name, email, course
         FROM students WHERE id = ?"
    );

    mysqli_stmt_bind_param($stmt, "i", $studentId);
    mysqli_stmt_execute($stmt);

    $resultEdit = mysqli_stmt_get_result($stmt);
    $edit = mysqli_fetch_assoc($resultEdit);

    mysqli_stmt_close($stmt);
}

/* SEARCH AND COURSE FILTER */
$search = trim($_GET["search"] ?? "");
$courseFilter = $_GET["course"] ?? "";

$sql = "SELECT id, name, email, course
        FROM students
        WHERE (name LIKE ? OR email LIKE ?)";

$searchValue = "%" . $search . "%";

if ($courseFilter !== "") {
    $sql .= " AND course = ?";

    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param(
        $stmt, "sss", $searchValue, $searchValue, $courseFilter
    );
} else {
    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param(
        $stmt, "ss", $searchValue, $searchValue
    );
}

mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Student Management System</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 30px;
        }

        input, select, button {
            padding: 7px;
            margin: 5px 3px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 15px;
        }

        th, td {
            border: 1px solid #777;
            padding: 8px;
            text-align: left;
        }

        th {
            background: #eeeeee;
        }

        .message {
            font-weight: bold;
        }
    </style>
</head>

<body>

    <h2>Student Management System</h2>

    <p class="message">
        <?php echo htmlspecialchars($msg); ?>
    </p>

    <h3>
        <?php echo $edit ? "Edit Student" : "Add Student"; ?>
    </h3>

    <form method="post" action="student.php">

        <input type="hidden" name="id"
            value="<?php echo htmlspecialchars(
                (string)($edit["id"] ?? "")
            ); ?>">

        <label>Name:</label>
        <input type="text" name="name" required
            value="<?php echo htmlspecialchars(
                $edit["name"] ?? ""
            ); ?>">

        <label>Email:</label>
        <input type="email" name="email" required
            value="<?php echo htmlspecialchars(
                $edit["email"] ?? ""
            ); ?>">

        <label>Course:</label>

        <select name="course" required>
            <option value="BCA"
                <?php echo (($edit["course"] ?? "") === "BCA")
                    ? "selected" : ""; ?>>
                BCA
            </option>

            <option value="BSc IT"
                <?php echo (($edit["course"] ?? "") === "BSc IT")
                    ? "selected" : ""; ?>>
                BSc IT
            </option>
        </select>

        <button type="submit" name="save">Save</button>
    </form>

    <hr>

    <h3>Search and Filter</h3>

    <form method="get" action="student.php">

        <input type="text" name="search"
            placeholder="Name or Email"
            value="<?php echo htmlspecialchars($search); ?>">

        <select name="course">
            <option value="">All Courses</option>

            <option value="BCA"
                <?php echo $courseFilter === "BCA"
                    ? "selected" : ""; ?>>
                BCA
            </option>

            <option value="BSc IT"
                <?php echo $courseFilter === "BSc IT"
                    ? "selected" : ""; ?>>
                BSc IT
            </option>
        </select>

        <button type="submit">Search</button>
        <a href="student.php">Show All</a>

    </form>

    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
        </tr>

        <?php while ($row = mysqli_fetch_assoc($result)) { ?>

        <tr>
            <td><?php echo (int)$row["id"]; ?></td>

            <td><?php echo htmlspecialchars($row["name"]); ?></td>

            <td><?php echo htmlspecialchars($row["email"]); ?></td>

            <td><?php echo htmlspecialchars($row["course"]); ?></td>

            <td>
                <a href="student.php?edit=<?php
                    echo (int)$row["id"];
                ?>">Edit</a>

                |

                <a href="student.php?delete=<?php
                    echo (int)$row["id"];
                ?>"
                onclick="return confirm(
                    'Are you sure you want to delete this student?'
                );">Delete</a>
            </td>
        </tr>

        <?php } ?>

    </table>

</body>
</html>

<?php
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>