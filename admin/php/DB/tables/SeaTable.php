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

        public static function  getSeasFields(){

            $db = ConnectDB();

            $sql = 'SELECT * FROM ' . self::getTableName();
            $stmt = $db->prepare($sql);

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

        public function updateSeaFields( $data ){
            $db = ConnectDB();

            $sql = '
UPDATE ' . self::getTableName() . ' SET
    name = :sea_name,
    description = :sea_desc
WHERE id = :id';

            $stmt = $db->prepare($sql);

            $stmt->bindValue( ':sea_name', $data->name, PDO::PARAM_STR );
            $stmt->bindValue( ':sea_desc', $data->description, PDO::PARAM_STR );
            $stmt->bindValue( ':id', (int) $data->id, PDO::PARAM_INT );

            $stmt->execute();
            $lastInsertId = $db->lastInsertId();

            return $lastInsertId;
        }

        public static function  getSeaFields( $id ){

            $db = ConnectDB();

            $sql = 'SELECT * FROM ' . self::getTableName() . ' WHERE id=:id';
            $stmt = $db->prepare($sql);

            $stmt->bindValue( ':id', $id, PDO::PARAM_INT );

            $stmt->execute();
            $result = $stmt->fetchAll();

            return $result;
        }

        public static function  updateSeaImage($image, $id){
            $db = ConnectDB();

            $sql = '
UPDATE ' . self::getTableName() . ' SET
   img_path = :image
WHERE id = :id';

            $stmt = $db->prepare($sql);

            $stmt->bindValue( ':image', $image, PDO::PARAM_STR );
            $stmt->bindValue( ':id', (int) $id, PDO::PARAM_INT );

            $stmt->execute();
            $lastInsertId = $db->lastInsertId();

            return $lastInsertId;
        }






    }
}

