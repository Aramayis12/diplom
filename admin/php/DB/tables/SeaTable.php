<?php
if (interface_exists('ConstructDB')) {
    class SeaTable implements ConstructDB {
        private static $tableName = 'sea_table';
        private static $tableFields = array(
            'id' => 'id',
            'name' => 'name',
            'description' => 'description',
            'img_path' => 'img_path'
        );

        public static function getTableName()
        {
            return self::$tableName;
        }

        public static function getTableFields()
        {
            return self::$tableFields;
        }

        public static function  getSeasFields( $id = null ){

            $db = ConnectDB();

            $where = '1 = 1';
            if( $id != null) {
                $where = 'id = :id';
            }

            $sql = 'SELECT * FROM ' . self::getTableName() . ' WHERE ' . $where;
            $stmt = $db->prepare($sql);

            if( $id != null) {
                $stmt->bindValue( ':id', $id, PDO::PARAM_INT );
            }

            $stmt->execute();
            $result = $stmt->fetchAll();

            return $result;
        }


        public static function insertSea(  $data )
        {
            $db = ConnectDB();

            $sql = '
INSERT INTO ' . self::getTableName() . ' ( name, description, img_path )
VALUES ( :name, :description, :image )';

            $stmt = $db->prepare( $sql );


            $stmt->bindValue( ':name', $data->name, PDO::PARAM_STR );
            $stmt->bindValue( ':image', $data->image, PDO::PARAM_STR );
            $stmt->bindValue( ':description', $data->description, PDO::PARAM_STR );


            $stmt->execute();
            $lastInsertId = $db->lastInsertId();

            return $lastInsertId;
        }






    }
}

