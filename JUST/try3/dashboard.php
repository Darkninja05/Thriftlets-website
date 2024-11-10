<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];

// Fetch user data
$stmt = $pdo->prepare("SELECT username, role, dashboard_content FROM users WHERE id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $content = $_POST['dashboard_content'];
    $stmt = $pdo->prepare("UPDATE users SET dashboard_content = ? WHERE id = ?");
    $stmt->execute([$content, $user_id]);
}

$is_admin = $user['role'] === 'admin';

// Fetch all users if admin
$all_users = [];
if ($is_admin) {
    $stmt = $pdo->prepare("SELECT username, dashboard_content FROM users WHERE role = 'user'");
    $stmt->execute();
    $all_users = $stmt->fetchAll();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Dashboard</title>
</head>
<body>
    <h1><?php echo htmlspecialchars($user['username']); ?>'s Dashboard</h1>
    <form method="POST">
        <textarea name="dashboard_content" required><?php echo htmlspecialchars($user['dashboard_content']); ?></textarea>
        <button type="submit">Save</button>
    </form>
    <a href="logout.php">Log Out</a>

    <?php if ($is_admin): ?>
        <h2>All Users</h2>
        <ul>
            <?php foreach ($all_users as $u): ?>
                <li><?php echo htmlspecialchars($u['username']); ?>: <?php echo htmlspecialchars($u['dashboard_content']); ?></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</body>
</html>
