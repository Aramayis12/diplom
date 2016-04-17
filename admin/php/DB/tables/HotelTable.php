<?php

if (interface_exists('ConstructDB')) {
    class HotelTable implements ConstructDB {
        private static $tableName = 'hotel_table';
        private static $tableFields = array(
            'id' => 'id',
            'name_hotel' => 'name_hotel',
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
    }
}


