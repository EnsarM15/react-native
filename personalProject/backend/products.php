<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$products = [
  ['id'=>1,'name'=>'GripMaster Pro','brand'=>'RevoGlove','price'=>59.99,'image'=>'https://via.placeholder.com/300x200?text=GripMaster+Pro'],
  ['id'=>2,'name'=>'SafeHold X','brand'=>'GoalTec','price'=>49.99,'image'=>'https://via.placeholder.com/300x200?text=SafeHold+X'],
  ['id'=>3,'name'=>'Elite Catch','brand'=>'RevoGlove','price'=>69.99,'image'=>'https://via.placeholder.com/300x200?text=Elite+Catch'],
  ['id'=>4,'name'=>'PocketKeeper','brand'=>'GlovePro','price'=>39.99,'image'=>'https://via.placeholder.com/300x200?text=PocketKeeper']
];

echo json_encode($products);