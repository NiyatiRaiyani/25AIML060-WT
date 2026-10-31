<?php
header("Content-Type: application/json");

require "db.php";

$method = $_SERVER["REQUEST_METHOD"];

function respond($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true) ?? [];

if ($method === "GET") {
    $result = $conn->query(
        "SELECT id, name, email FROM students ORDER BY id DESC"
    );

    if (!$result) {
        respond(500, ["message" => "Failed to fetch students"]);
    }

    $students = [];

    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }

    respond(200, $students);
}

if ($method === "POST") {
    $name = trim($data["name"] ?? "");
    $email = trim($data["email"] ?? "");

    if ($name === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(400, [
            "message" => "Enter a valid name and email"
        ]);
    }

    $stmt = $conn->prepare(
        "INSERT INTO students (name, email) VALUES (?, ?)"
    );

    $stmt->bind_param("ss", $name, $email);

    if ($stmt->execute()) {
        respond(201, ["message" => "Student added successfully"]);
    }

    respond(500, ["message" => "Failed to add student"]);
}

if ($method === "PUT") {
    $id = filter_var($data["id"] ?? null, FILTER_VALIDATE_INT);
    $name = trim($data["name"] ?? "");
    $email = trim($data["email"] ?? "");

    if (!$id || $id < 1 || $name === "" ||
        !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(400, ["message" => "Valid ID, name and email are required"]);
    }

    $stmt = $conn->prepare(
        "UPDATE students SET name = ?, email = ? WHERE id = ?"
    );

    $stmt->bind_param("ssi", $name, $email, $id);

    if (!$stmt->execute()) {
        respond(500, ["message" => "Failed to update student"]);
    }

    if ($stmt->affected_rows === 0) {
        $check = $conn->prepare("SELECT id FROM students WHERE id = ?");
        $check->bind_param("i", $id);
        $check->execute();
        $check->store_result();

        if ($check->num_rows === 0) {
            respond(404, ["message" => "Student not found"]);
        }
    }

    respond(200, ["message" => "Student updated successfully"]);
}

if ($method === "DELETE") {
    $id = filter_var($data["id"] ?? null, FILTER_VALIDATE_INT);

    if (!$id || $id < 1) {
        respond(400, ["message" => "Valid student ID is required"]);
    }

    $stmt = $conn->prepare("DELETE FROM students WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if ($stmt->affected_rows === 0) {
        respond(404, ["message" => "Student not found"]);
    }

    respond(200, ["message" => "Student deleted successfully"]);
}

respond(405, ["message" => "Method not allowed"]);
?>