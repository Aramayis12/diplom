<?php
if ( interface_exists( 'ConstructDB' ) ) {
    class NewsTable implements ConstructDB {
        private static $tableName = 'news_table';
        private static $tableFields = array(
            'id' => 'id',
            'name' => 'name',
            'description' => 'description',
            'image' => 'image',
            'sea_id' => 'sea_id'
        );

        public static function getTableName()
        {
            return self::$tableName;
        }

        public static function getTableFields()
        {
            return self::$tableFields;
        }

        public static function insertNews(  $data , $file_path )
        {
            $db = ConnectDB();

            $sql = '
INSERT INTO ' . self::getTableName() . ' ( name, description, image, sea_id )
VALUES ( :name, :description, :image, :sea_id )
            ';

            $stmt = $db->prepare( $sql );


            $stmt->bindValue( ':name', $data["name"], PDO::PARAM_STR );
            $stmt->bindValue( ':description', $data["description"], PDO::PARAM_STR );
            $stmt->bindValue( ':image', $file_path, PDO::PARAM_STR );
            $stmt->bindValue( ':sea_id', $data["sea_id"], PDO::PARAM_INT );


            $stmt->execute();
            $lastInsertId = $db->lastInsertId();

            return $lastInsertId;
        }

        public static function selectNews()
        {
            $db = ConnectDB();

            $sql = "SELECT * FROM " . self::getTableName();
            $stmt = $db->prepare( $sql );

            $stmt->execute();
            $result = $stmt->fetchAll();
            
            return $result;
        }

        public static function updateNews( $data, $image = '' )
        {
            $db = ConnectDB();

            $image_update = '';
            if( $image != '' ){
                $image_update = ',image = :image';
            }



            $sql = "
UPDATE " . self::getTableName() . "
SET    name = :name,
       description = :description
       " . $image_update . "
WHERE  id = :id";

            $stmt = $db->prepare( $sql );


            $stmt->bindValue( ":id", $data->id, PDO::PARAM_INT );
            $stmt->bindValue( ":name", $data->name, PDO::PARAM_STR );
            $stmt->bindValue( ":description",$data->description, PDO::PARAM_STR );

            if( $image != NULL ){
                $stmt->bindValue( ":image", $image, PDO::PARAM_STR );
            }

            $res = $stmt->execute();

            return $res;
        }

    }
}