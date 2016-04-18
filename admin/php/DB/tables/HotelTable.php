<?php

if (interface_exists('ConstructDB')) {
    class HotelTable implements ConstructDB {
        private static $tableName = 'hotel_table';
        private static $tableFields = array(
            'id' => 'id',
            'name' => 'name',
            'stars' => 'stars',
            'description_hotel' => 'description_hotel',
            'img_hotel_path' => 'img_hotel_path'
        );

        static public function getTableName()
        {
            return self::$tableName;
        }

        static public  function getTableFields()
        {
            return self::$tableFields;
        }

        public static function  getHotelsFields( $id = null ){

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

        public function getHotelWithSeaInfo( $id ){
            $db = ConnectDB();

            $sql = '
SELECT h.id AS hotel_ID,
       h.name AS hotel_name,
       h.stars AS hotel_stars,
       h.description_hotel AS hotel_description,
       h.img_hotel_path AS hotel_image,
       s.id AS sea_ID,
       s.name AS sea_name
FROM ' . self::getTableName() . ' AS h
    INNER JOIN
     ' . SeaTable::getTableName() . ' AS s
        ON h.sea_id = s.id
WHERE h.id=:id';
            $stmt = $db->prepare($sql);

            $stmt->bindValue( ':id', $id, PDO::PARAM_INT );
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;


        }

        public function updateHotelsFields( $data ){
            $db = ConnectDB();

            $sql = '
UPDATE ' . self::getTableName() . ' SET
    name = :hotel_name,
    stars = :hotel_stars,
    description_hotel = :hotel_desc,
    sea_id = :hotel_sea_ID
WHERE id = :hotel_ID';


            $stmt = $db->prepare($sql);

            var_dump('hotel_stars - ', (int) $data->hotel_stars);
            var_dump('hotel_sea_ID - ', (int) $data->hotel_sea_ID);
            var_dump('hotel_ID - ', (int) $data->hotel_ID);


            $stmt->bindValue( ':hotel_name', $data->hotel_name, PDO::PARAM_STR );
            $stmt->bindValue( ':hotel_stars', (int) $data->hotel_stars, PDO::PARAM_INT );
            $stmt->bindValue( ':hotel_desc', $data->hotel_desc, PDO::PARAM_STR );
            $stmt->bindValue( ':hotel_sea_ID',  (int) $data->hotel_sea_ID, PDO::PARAM_INT );
            $stmt->bindValue( ':hotel_ID',  (int) $data->hotel_ID, PDO::PARAM_INT );

            $stmt->execute();

        }
    }
}


