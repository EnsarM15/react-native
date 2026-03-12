<?php

header('Content-Type: application/json');

require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');
$confirmPassword = trim($input['confirmPassword'] ?? '');

// Validation
if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
  echo json_encode(['success' => false, 'message' => 'All fields are required']);
  exit;
}

if ($password !== $confirmPassword) {
  echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
  exit;
}

if (strlen($password) < 6) {
  echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['success' => false, 'message' => 'Invalid email format']);
  exit;
}

try {
  // Check if email already exists
  $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
  $stmt->execute([$email]);
  if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
  }

  // Hash password with bcrypt
  $hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

  // Insert new user into database
  $stmt = $pdo->prepare('INSERT INTO users (name, email, password, is_active) VALUES (?, ?, ?, 1)');
  $stmt->execute([$name, $email, $hashedPassword]);

  // Get the newly created user ID
  $userId = $pdo->lastInsertId();
  $token = base64_encode($email . ':' . $userId);

  // Optional: Try to log the registration session (don't fail if sessions table doesn't exist)
  try {
    $sessionStmt = $pdo->prepare('INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))');
    $sessionStmt->execute([$userId, $token]);
  } catch (PDOException $e) {
    // Sessions table might not exist, but registration was successful
  }

  echo json_encode([
    'success' => true,
    'message' => 'Registration successful',
    'token' => $token,
    'user' => ['id' => $userId, 'name' => $name, 'email' => $email]
  ]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $e->getMessage()]);
}
 
?>
