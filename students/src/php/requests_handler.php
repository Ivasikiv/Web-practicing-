<?php

require_once 'student_controller.php';
ini_set('display_errors', 1);



// $user = 'DmytroIvasikiv';
// $pass = '&*gGedY!JkR6w-3';
$user = 'root';
$db = 'Lab4PVI';

try {
    $connection = new mysqli('localhost', $user);                                           // підключення до БД    
    if ($connection->connect_errno) {                                                       // перевірка на підключення
        $connection->close();
        throw new Exception("Failed to connect to MySQL: " . $connection->connect_error);
    } else {
        $result = $connection->query("SHOW DATABASES LIKE '$db'");                          // перевірка на існування БД
        if ($result === false || $result->num_rows === 0) {
            $connection->close();
            throw new Exception('DB does not exist');
        } else {                                                                            // якщо БД існує, то виконуємо запит
            $connection->select_db($db);
            $controller = new StudentController($connection);
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $controller->handleRequest($data);
        }
    }
}

catch (Exception $e) {
    $error = array('status' => false, 'errorMessage' => $e->getMessage());
    echo json_encode($error);
}

?>