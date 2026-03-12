<?php

header('Content-Type: application/json');

require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);

$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');

if (empty($email) || empty($password)) {
  echo json_encode(['success' => false, 'message' => 'Email and password are required']);
  exit;
}

try {
  // Query database for user
  $stmt = $pdo->prepare('SELECT id, name, email, password FROM users WHERE email = ? AND is_active = 1');
  $stmt->execute([$email]);
  $user = $stmt->fetch();

  if ($user && password_verify($password, $user['password'])) {
    // Password is correct
    $token = base64_encode($user['email'] . ':' . $user['id']);
    
    // Optional: Try to log the login session (don't fail if sessions table doesn't exist)
    try {
      $sessionStmt = $pdo->prepare('INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))');
      $sessionStmt->execute([$user['id'], $token]);
    } catch (PDOException $e) {
      // Sessions table might not exist, but login was successful
    }
    
    echo json_encode([
      'success' => true,
      'message' => 'Login successful',
      'token' => $token,
      'user' => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']]
    ]);
    exit;
  } else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    exit;
  }
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Login failed: ' . $e->getMessage()]);
}