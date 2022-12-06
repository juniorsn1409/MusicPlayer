<?php

header("Content-Type: application/json");
header("Acess-Control-Allow-Origin: *");
header("Acess-Control-Allow-Methods: DELETE");
header("Acess-Control-Allow-Headers: Acess-Control-Allow-Headers,Content-Type, 
Acess-Control-Allow-Methods, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

$pid = $data["id"];

require_once "../connect.php";

echo $query = "DELETE FROM MUSICAS WHERE ID = $pid";

if(mysqli_query($con, $query) or die("Delete Query Failed"))
{	
	echo json_encode(array("message" => "Music Delete Successfully", "status" => true));	
}
else
{	
	echo json_encode(array("message" => "Failed Music Not Deleted", "status" => false));	
}

?>