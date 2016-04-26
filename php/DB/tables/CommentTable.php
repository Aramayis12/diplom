<?php

if (interface_exists('ConstructDB')) {


    class CommentTable implements ConstructDB {
        private static $tableName = 'comments_table';

        private static $tableFields = array(
            'id' => 'id',
            'name' => 'name',
            'email' => 'email',
            'message' => 'message',
            'cat' => 'cat',
            'post_id' => 'post_id',
            'date' => 'date',
            'approve' => 'approve'
        );

        static public function getTableName()
        {
            return self::$tableName;
        }

        static public  function getTableFields()
        {
            return self::$tableFields;
        }

        static public function getComments(){

            $db = ConnectDB();

            $sql = 'SELECT * FROM ' . self::getTableName();
            $stmt = $db->prepare($sql);

            $stmt->execute();
            $result = $stmt->fetchAll();

            return $result;
        }

        static public function insertComment( $data ){

            $db = ConnectDB();

            $sql = '
INSERT INTO ' . self::getTableName() . ' ( name, email, message, cat, post_id, date, approve)
VALUES ( :name, :email, :message, :cat, :post_id, :date, :approve )
            ';

            $stmt = $db->prepare( $sql );

            
            $stmt->bindValue( ':name', $data->name, PDO::PARAM_STR );
            $stmt->bindValue( ':email', $data->email, PDO::PARAM_STR );
            $stmt->bindValue( ':message', $data->message, PDO::PARAM_STR );
            $stmt->bindValue( ':cat', $data->cat, PDO::PARAM_STR );
            $stmt->bindValue( ':post_id', $data->post_id, PDO::PARAM_INT );
            $stmt->bindValue( ':date', $data->date, PDO::PARAM_STR );
            $stmt->bindValue( ':approve', $data->approve, PDO::PARAM_INT );
            

            $stmt->execute();
            $lastInsertId = $db->lastInsertId(); 
            
            return $lastInsertId;
       

        } 

        static public function getComment( $data ){
            $db = ConnectDB();

            $sql = 'SELECT * FROM ' . self::getTableName() . " WHERE cat=:cat && post_id=:post_id  ORDER BY date DESC";
            $stmt = $db->prepare($sql);

            $stmt->bindValue( ':cat', $data->cat, PDO::PARAM_STR );
            $stmt->bindValue( ':post_id', $data->id, PDO::PARAM_INT );

            $stmt->execute();
            $result = $stmt->fetchAll();

            return $result;
        }

    }

}


