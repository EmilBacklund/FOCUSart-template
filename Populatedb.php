<?php

$data = file_get_contents("https://emilbacklund.flywheelsites.com/wp-json/wp/v2/posts?acf_format=standard&per_page=32");

$data = json_decode($data, true);
echo $data[0]["id"];
// foreach ($data as $index => $item){
//     echo  . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br><br>";
// }

// foreach ($data as $index => $item){
//     echo  . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br>";
//     echo . "<br><br>";
// }
?>