<?php

class ServerRequest{
    var $database;
    var $host = "127.0.0.1";
    var $user = "root";
    var $password = "";
    var $conn;
    var $database_info;
    function __construct(){
        $this->database = $_POST["project_name"];
        $this->database_info = $_POST["project"];
        $this->createDatabase();
        $this->conn = mysqli_connect($this->host,$this->user,$this->password,$this->database);
        $this->createEssentialTables();
        $this->addData('templates','html');
        header("Location: ../Templates/Welcome.html");
        echo json_encode($this->database_info);
    }
    private function createDatabase(){
        $this->conn = mysqli_connect($this->host,$this->user,$this->password);
        $db="CREATE DATABASE IF NOT EXISTS $this->database";
        $this->conn->query($db);
    }
    private function deleteDatabase(){
        $db = "DROP DATABASE $this->database";
        $this->conn->query($db);
    }

    private function createEssentialTables(){
        $this->createTable("libs",'css VARCHAR (20000), js VARCHAR (20000)');
        $this->createTable("server",'serverRequest VARCHAR (20000)');
        $this->createTable("sources",'images VARCHAR (20000), icons VARCHAR (20000)');
        $this->createTable("templates",'html VARCHAR (20000)');
    }

    function createTable($name,$cols){
        $tb="CREATE TABLE IF NOT EXISTS $name($cols)";
        $this->conn->query($tb);
    }

    private function addData($table,$cols){
        $data = "INSERT INTO $table($cols) VALUES('$this->database_info') ";
        if ($this->conn->query($data)){
            return true;
        }else return false;

    }
}
$sR=new ServerRequest();

