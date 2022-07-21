<?php //Fil med placeholders och gränssnitt för åtkomst till databasen
$host = 'localhost'; //webservern
$data = 'art'; //databasen
$user = 'root'; //användaren för databasen
$pass = 'mysql'; //lösenord till databasen
$chrs = 'utf8mb4'; //avkodning för teckenuppsättning
$attr = "mysql:host=$host;dbname=$data;charset=$chrs"; //variabel som används för att nå databsen med våra satta värden
$opts = 
[
    PDO::ATTR_ERRMODE               => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE    => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES      => false,
]; //Tillkomst till databasen via PDO gränssnittet.s
?>