<?php
$conn = mysqli_connect("localhost", "root", "", "event");

if (!$conn) {
    die("Database connection failed.");
}

$message = "";
$editEvent = null;

$uploadDir = __DIR__ . "/uploads/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

/* ADD AND UPDATE EVENT */
if (isset($_POST["save"])) {
    $name = trim($_POST["event_name"] ?? "");
    $date = $_POST["event_date"] ?? "";
    $venue = trim($_POST["venue"] ?? "");
    $description = trim($_POST["description"] ?? "");
    $status = $_POST["status"] ?? "Open";
    $id = (int)($_POST["id"] ?? 0);

    $poster = $_POST["old_poster"] ?? "";
    $newPosterUploaded = false;

    if (!in_array($status, ["Open", "Closed"], true)) {
        $message = "Invalid event status.";
    } elseif ($name === "" || $date === "" || $venue === "") {
        $message = "Please fill in all required fields.";
    } else {
        if (isset($_FILES["poster"]) &&
            $_FILES["poster"]["error"] !== UPLOAD_ERR_NO_FILE) {

            $file = $_FILES["poster"];

            if ($file["error"] !== UPLOAD_ERR_OK) {
                $message = "Poster upload failed.";
            } elseif ($file["size"] > 2 * 1024 * 1024) {
                $message = "Poster must be less than or equal to 2 MB.";
            } else {
                $finfo = new finfo(FILEINFO_MIME_TYPE);
                $mime = $finfo->file($file["tmp_name"]);

                $allowed = [
                    "image/jpeg" => "jpg",
                    "image/png"  => "png",
                    "image/gif"  => "gif"
                ];

                if (!isset($allowed[$mime]) ||
                    @getimagesize($file["tmp_name"]) === false) {
                    $message = "Only valid JPG, PNG, or GIF images are allowed.";
                } else {
                    $poster = bin2hex(random_bytes(16))
                        . "." . $allowed[$mime];

                    if (move_uploaded_file(
                        $file["tmp_name"],
                        $uploadDir . $poster
                    )) {
                        $newPosterUploaded = true;
                    } else {
                        $message = "Unable to save uploaded poster.";
                    }
                }
            }
        }

        if ($message === "") {
            if ($id === 0) {
                $stmt = mysqli_prepare(
                    $conn,
                    "INSERT INTO events
                    (event_name, event_date, venue, description, poster, status)
                    VALUES (?, ?, ?, ?, ?, ?)"
                );

                mysqli_stmt_bind_param(
                    $stmt, "ssssss",
                    $name, $date, $venue, $description, $poster, $status
                );

                $ok = mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);

                $message = $ok
                    ? "Event added successfully!"
                    : "Failed to add event.";
            } else {
                $stmt = mysqli_prepare(
                    $conn,
                    "UPDATE events SET
                    event_name=?, event_date=?, venue=?,
                    description=?, poster=?, status=?
                    WHERE id=?"
                );

                mysqli_stmt_bind_param(
                    $stmt, "ssssssi",
                    $name, $date, $venue, $description,
                    $poster, $status, $id
                );

                $ok = mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);

                $message = $ok
                    ? "Event updated successfully!"
                    : "Failed to update event.";
            }

            if ($message === "Event added successfully!" ||
                $message === "Event updated successfully!") {
                if ($newPosterUploaded) {
                    $oldPoster = $_POST["old_poster"] ?? "";

                    if ($oldPoster !== "" &&
                        basename($oldPoster) === $oldPoster &&
                        is_file($uploadDir . $oldPoster)) {
                        unlink($uploadDir . $oldPoster);
                    }
                }
            } elseif ($newPosterUploaded &&
                is_file($uploadDir . $poster)) {
                unlink($uploadDir . $poster);
            }
        }
    }
}

/* DELETE EVENT */
if (isset($_GET["delete"])) {
    $id = (int)$_GET["delete"];

    $stmt = mysqli_prepare(
        $conn,
        "SELECT poster FROM events WHERE id=?"
    );
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    $old = mysqli_fetch_assoc($res);
    mysqli_stmt_close($stmt);

    $stmt = mysqli_prepare(
        $conn,
        "DELETE FROM events WHERE id=?"
    );
    mysqli_stmt_bind_param($stmt, "i", $id);
    $ok = mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    if ($ok) {
        if ($old && !empty($old["poster"]) &&
            basename($old["poster"]) === $old["poster"] &&
            is_file($uploadDir . $old["poster"])) {
            unlink($uploadDir . $old["poster"]);
        }

        $message = "Event deleted successfully!";
    } else {
        $message = "Failed to delete event.";
    }
}

/* FETCH EVENT FOR EDITING */
if (isset($_GET["edit"])) {
    $id = (int)$_GET["edit"];

    $stmt = mysqli_prepare(
        $conn,
        "SELECT * FROM events WHERE id=?"
    );
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    $editEvent = mysqli_fetch_assoc($res);
    mysqli_stmt_close($stmt);
}

/* SEARCH AND STATUS FILTER */
$search = trim($_GET["search"] ?? "");
$filter = $_GET["status"] ?? "";

$sql = "SELECT * FROM events
        WHERE event_name LIKE ?";

$searchValue = "%" . $search . "%";

if (in_array($filter, ["Open", "Closed"], true)) {
    $sql .= " AND status = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $searchValue, $filter);
} else {
$stmt = mysqli_prepare($conn, $sql);

if ($stmt === false) {
    die("SQL Prepare Error: " . mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "s", $search);
}

mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Event Management System</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 30px;
            background: #f4f6f9;
        }

        h2, h3 {
            color: #23395d;
        }

        form, .events {
            background: white;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 6px;
        }

        input, textarea, select, button {
            padding: 9px;
            margin: 6px 3px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
        }

        th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
        }

        th {
            background: #23395d;
            color: white;
        }

        img {
            max-width: 100px;
            height: auto;
        }

        .message {
            font-weight: bold;
            color: #166534;
        }
    </style>
</head>

<body>
    <h2>Event Management System</h2>

    <p class="message">
        <?php echo htmlspecialchars($message); ?>
    </p>

    <h3><?php echo $editEvent ? "Edit Event" : "Add Event"; ?></h3>

    <form method="post" enctype="multipart/form-data">
        <input type="hidden" name="id"
            value="<?php echo (int)($editEvent["id"] ?? 0); ?>">

        <input type="hidden" name="old_poster"
            value="<?php echo htmlspecialchars($editEvent["poster"] ?? ""); ?>">

        <label>Event Name:</label>
        <input type="text" name="event_name" required
            value="<?php echo htmlspecialchars($editEvent["event_name"] ?? ""); ?>">

        <label>Date:</label>
        <input type="date" name="event_date" required
            value="<?php echo htmlspecialchars($editEvent["event_date"] ?? ""); ?>">

        <label>Venue:</label>
        <input type="text" name="venue" required
            value="<?php echo htmlspecialchars($editEvent["venue"] ?? ""); ?>">

        <br>

        <label>Description:</label>
        <textarea name="description"><?php
            echo htmlspecialchars($editEvent["description"] ?? "");
        ?></textarea>

        <label>Status:</label>
        <select name="status">
            <option value="Open"
                <?php echo ($editEvent["status"] ?? "Open") === "Open"
                    ? "selected" : ""; ?>>Open</option>
            <option value="Closed"
                <?php echo ($editEvent["status"] ?? "") === "Closed"
                    ? "selected" : ""; ?>>Closed</option>
        </select>

        <br>

        <label>Poster (JPG, PNG, GIF; maximum 2 MB):</label>
        <input type="file" name="poster"
            accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif">

        <button type="submit" name="save">Save Event</button>
    </form>

    <h3>Search and Filter Events</h3>

    <form method="get">
        <input type="text" name="search"
            placeholder="Search event name"
            value="<?php echo htmlspecialchars($search); ?>">

        <select name="status">
            <option value="">All Statuses</option>
            <option value="Open"
                <?php echo $filter === "Open" ? "selected" : ""; ?>>Open</option>
            <option value="Closed"
                <?php echo $filter === "Closed" ? "selected" : ""; ?>>Closed</option>
        </select>

        <button type="submit">Search</button>
        <a href="event.php">Show All</a>
    </form>

    <h3>Event List</h3>

    <table>
        <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Description</th>
            <th>Poster</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>

        <?php while ($row = mysqli_fetch_assoc($result)) { ?>
        <tr>
            <td><?php echo (int)$row["id"]; ?></td>
            <td><?php echo htmlspecialchars($row["event_name"]); ?></td>
            <td><?php echo htmlspecialchars($row["event_date"]); ?></td>
            <td><?php echo htmlspecialchars($row["venue"]); ?></td>
            <td><?php echo htmlspecialchars($row["description"] ?? ""); ?></td>
            <td>
                <?php if (!empty($row["poster"])) { ?>
                    <img src="<?php echo "uploads/" .
                        rawurlencode(basename($row["poster"])); ?>"
                        alt="Event poster">
                <?php } else { ?>
                    No poster
                <?php } ?>
            </td>
            <td><?php echo htmlspecialchars($row["status"]); ?></td>
            <td>
                <a href="event.php?edit=<?php echo (int)$row["id"]; ?>">Edit</a>
                |
                <a href="event.php?delete=<?php echo (int)$row["id"]; ?>"
                   onclick="return confirm('Delete this event?');">Delete</a>
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