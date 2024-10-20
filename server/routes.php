<?php
require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];


if($request === '/'){
    header('Content-Type: text/html');
    $htmlFile = './index.html';
    
    readfile($htmlFile);
}
if($request === $baseUrl . "/blogs"){
    switch ($method) {
        case 'GET':
            if(empty($_GET['id']) && empty($_GET['tag']) ){
                getAllBlogs(($conn));
                $id = $_GET['id'];
            } else if(!empty($_GET['id'])){
                getBlogById($id);
            } else if(!empty($_GET['tag'])){
                $tag = $_GET['tag'];
                getBlogWithTag($conn, $tag);
            }
            break;
        case 'POST':
            if(!empty($_POST['token']) && $_POST['token'] === $accesToken){
                if(!empty($_POST['body'] && !empty($_POST['title']) )){
                    createBlog($conn);
                }
            }
    } 
 } 
 function getAllBlogs (&$conn) {
    $sql = "SELECT * FROM blogs ORDER BY created DESC";
            $result = $conn->query($sql);
            $data = [];
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        array_push($data, $row);
                    }
                    http_response_code(200);
                    echo json_encode($data);
                  } else {
                    http_response_code(404);
                  }
 }
 function createBlog (&$conn) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https://" : "http://";
    $fileName = $_FILES['image']['name'];
    $tmpName = $_FILES['image']['tmp_name'];
    $folder = "/web/".$fileName;
    $relFolder = $protocol.$_SERVER['HTTP_HOST'] . $folder;

    $body = $_POST['body'];
    $title = $_POST['title'];
    $tags = $_POST['tags'];
    $sql = "INSERT INTO blogs (title, body, image,tags)
            VALUES ('$title','$body', '$relFolder', '$tags')";
    move_uploaded_file($tmpName, ".".$folder);
    $stmt = $conn->prepare($sql);
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }
 }
 function getBlogById(&$conn, $id) {
    $query = "UPDATE blogs SET views=views+1 WHERE id='$id'";
    mysqli_query($conn, $query);
    $sql = "SELECT * FROM blogs WHERE id=$id";
    $result = $conn->query($sql);
    $data =  $result->fetch_assoc();
    echo json_encode($data);
 }
 function getBlogWithTag(&$conn, $tag){
    $sql = "SELECT * FROM blogs WHERE tags LIKE '%$tag%'";
    $result = $conn->query($sql);
    $data = [];
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            http_response_code(200);
            array_push($data, $row);
            
        }
        echo json_encode($data);
      } else {
        http_response_code(404);
      }
 }
?>