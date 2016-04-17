<?php

    function ConnectDB(){
        global $db_name;
        global $db_user;
        global $db_pass;
        global $host;
        global $charset;


        $dsn = "mysql:host=$host;dbname=$db_name;charset=$charset";

        $opt = array(
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        );

        $pdo = new PDO($dsn, $db_user, $db_pass, $opt);

        return $pdo;
    }

