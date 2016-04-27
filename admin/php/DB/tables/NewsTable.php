<?php
if ( interface_exists( 'ConstructDB' ) ) {
    class NewsTable implements ConstructDB {
        private static $tableName = 'news_table';
        private static $tableFields = array(
            'id' => 'id',
            'name' => 'name',
            'description' => 'description',
            'image' => 'image',
            'sea_id' => 'sea_id',
            'date' => 'date'
        );

        public static function getTableName()
        {
            return self::$tableName;
        }

        public static function getTableFields()
        {
            return self::$tableFields;
        }

        public static function insertNews(  $data )
        {
            $db = ConnectDB();

            $sql = '
INSERT INTO ' . self::getTableName() . ' ( name, description, sea_id, image, date )
VALUES ( :name, :description, :sea_ID, :image, :date )';

            $stmt = $db->prepare( $sql );


            $stmt->bindValue( ':name', $data->news_name, PDO::PARAM_STR );
            $stmt->bindValue( ':description', $data->news_desc, PDO::PARAM_STR );
            $stmt->bindValue( ':sea_ID',  (int) $data->news_sea_ID, PDO::PARAM_INT );
            $stmt->bindValue( ':image', $data->news_image, PDO::PARAM_STR );
            $stmt->bindValue( ':date', $data->date, PDO::PARAM_STR );

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

        public function getNewsOneWithSeaInfo( $id ) {
            $db = ConnectDB();

            $sql = '
SELECT n.id AS news_ID,
       n.name AS news_name,
       n.description AS news_description,
       n.image AS news_image,
       s.id AS sea_ID,
       s.name AS sea_name
FROM ' . self::getTableName() . ' AS n
    INNER JOIN
     ' . SeaTable::getTableName() . ' AS s
        ON n.sea_id = s.id
WHERE n.id=:id';
            $stmt = $db->prepare($sql);

            $stmt->bindValue( ':id', $id, PDO::PARAM_INT );
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }

        public function updateNewsFields( $data ){
            $db = ConnectDB();

            $sql = '
UPDATE ' . self::getTableName() . ' SET
    name = :news_name,
    description = :news_desc,
    sea_id = :news_sea_ID
WHERE id = :news_ID';


            $stmt = $db->prepare($sql);

            $stmt->bindValue( ':news_name', $data->news_name, PDO::PARAM_STR );
            $stmt->bindValue( ':news_desc', $data->news_desc, PDO::PARAM_STR );
            $stmt->bindValue( ':news_sea_ID',  (int) $data->news_sea_ID, PDO::PARAM_INT );
            $stmt->bindValue( ':news_ID',  (int) $data->news_ID, PDO::PARAM_INT );

            $stmt->execute();

        }

        public static function  updateNewsImage($image, $id){
            $db = ConnectDB();

            $sql = '
UPDATE ' . self::getTableName() . ' SET
   image = :image
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