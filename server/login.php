<?php 
$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];

if($request === $baseUrl . "/login" && $method === "POST"){   
    if(!empty($_POST['name']) && !empty($_POST['password'])){
        $login = $_POST['name'];
    $password = $_POST['password'];
    $hashPass =  hash(
         "sha256",
       $password
    );

    $sql = "SELECT * FROM users WHERE login='$login' AND password='$hashPass'";
    $result = $conn->query($sql);
        if($result->num_rows > 0){
            http_response_code(200);
            echo json_encode($result->fetch_assoc());
            return;
        }
    } else {
        
        print_r($_POST);
        http_response_code(400);
    }
    
    
}

?>