<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";




$conn = new mysqli($servername, $username, $password, $dbname);

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    $patient_id = $_POST["Patient_ID"];
    $patient_name = $_POST["Patient_Name"];
    $dob = $_POST["DateOfBirth"];
    $gender = $_POST["Gender"];
    $phoneNo = $_POST["PhoneNo"];
    $email = $_POST["Email"];
    $address = $_POST["Address"];
    $bg = $_POST["BloodGroup"];
    $pass = $_POST["Password"];
    
    $sql = "INSERT INTO patient(Patient_ID, PatientName,DateOFBirth,Gender,PhoneNo,Email,Address,BloodGroup,Password) VALUES ('$patient_id', '$patient_name','$dob','$gender','$phoneNo', '$email', '$address', '$bg', '$pass');";
    $res = mysqli_query($conn, $sql);

    if ($res) {
        echo "Item Added Succesfully";
    } else {
        echo "error";
    }
}