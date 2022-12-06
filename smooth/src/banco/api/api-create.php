<?php

header("Content-Type: application/json");
header("Acess-Control-Allow-Origin: *");
header("Acess-Control-Allow-Methods: POST");
header("Acess-Control-Allow-Headers: Acess-Control-Allow-Headers,Content-Type, 
Acess-Control-Allow-Methods, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data["NOME"];
$artista = $data["ARTISTA"];
$album = $data["ALBUM"];
$uri = $data["URI"];
$duracao = $data["DURACAO"];

require_once "../connect.php";

$query = "INSERT INTO MUSICAS (NOME, ARTISTA, ALBUM, URI, DURACAO) VALUES ('$nome', '$artista', '$album', '$uri', $duracao)";

if(mysqli_query($con, $query) or die("Insert Query Failed"))
{
	echo json_encode(array("message" => "Music Inserted Successfully", "status" => true));	
}
else
{
	echo json_encode(array("message" => "Failed Music Not Inserted ", "status" => false));	
}

?>

<!-- http://localhost/MusicPlayer/smooth/src/banco/api/api-create.php -->