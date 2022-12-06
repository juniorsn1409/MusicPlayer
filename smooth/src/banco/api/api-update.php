<?php

header("Content-Type: application/json");
header("Acess-Control-Allow-Origin: *");
header("Acess-Control-Allow-Methods: PUT");
header("Acess-Control-Allow-Headers: Acess-Control-Allow-Headers,Content-Type, 
Acess-Control-Allow-Methods, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data["NOME"];
$artista = $data["ARTISTA"];
$album = $data["ALBUM"];
$uri = $data["URI"];
$duracao = $data["DURACAO"];
$pid = $data["ID"];

require_once "../connect.php";

echo $query = "UPDATE MUSICAS SET NOME = '$nome', ARTISTA = '$artista', ALBUM = '$album' URI = '$uri', DURACAO = $duracao WHERE ID = $pid;";

if(mysqli_query($con, $query) or die("Update Query Failed"))
{	
	echo json_encode(array("message" => "User Update Successfully", "status" => true));	
}
else
{	
	echo json_encode(array("message" => "Failed User Not Updated", "status" => false));	
}

?>