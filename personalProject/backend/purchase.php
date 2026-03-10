<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
$input = json_decode(file_get_contents('php://input'), true);

$token = $input['token'] ?? '';
$product_id = $input['product_id'] ?? null;
$quantity = $input['quantity'] ?? 1;

if (!$token) {
  echo json_encode(['success'=>false,'message'=>'Not authenticated']);
  exit;
}

// In a real app validate token and record the order. Here we accept any token.
echo json_encode(['success'=>true,'order_id'=>rand(1000,9999)]);