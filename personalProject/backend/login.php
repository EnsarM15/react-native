<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

// Very small demo user
$users = [
  ['email'=>'user@example.com','password'=>'password','id'=>1,'name'=>'Demo User']
];

foreach ($users as $u) {
  if ($u['email'] === $email && $u['password'] === $password) {
    // return a fake token
    echo json_encode(['success'=>true,'token'=>base64_encode($u['email'] . ':' . $u['id'])]);
    exit;
  }
}

echo json_encode(['success'=>false,'message'=>'Invalid credentials']);