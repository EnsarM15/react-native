<?php
// Database configuration
$host = 'localhost';      // Database host
$db   = 'gv-gloves';        // Database name
$user = 'root';           // Database username
$pass = '';               // Database password
    // Character set

// Data Source Name (DSN)
$dsn = "mysql:host=$host;dbname=$db;";

// PDO options for better security and performance
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Throw exceptions on errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Fetch associative arrays by default
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Use native prepared statements
];

try {
    // Create PDO instance (connect to database)
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    // Handle connection errors securely
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>
