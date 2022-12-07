<?php

header("Content-Type: application/json");
header("Acess-Control-Allow-Origin: *");
header("Acess-Control-Allow-Methods: GET");
header("Acess-Control-Allow-Headers: Acess-Control-Allow-Headers,Content-Type, 
Acess-Control-Allow-Methods, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

$psearch = $data["search"];

require_once "../connect.php";

$query = "SELECT * FROM MUSICAS WHERE NOME LIKE '%psearch%'";

$result = mysqli_query($con, $query) or die("Search Query Failed.");

$count = mysqli_num_rows($result);

if($count > 0)
{	
	$row = mysqli_fetch_all($result, MYSQLI_ASSOC);
	
	echo json_encode($row);
}
else
{	
	echo json_encode(array("message" => "No Search Found.", "status" => false));
}

?>

<!-- http://localhost/MusicPlayer/smooth/src/banco/api/api-search.php -->