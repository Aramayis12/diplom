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

        static public function getHotels(){
            $db = ConnectDB();

            $sql = 'SELECT * FROM ' . self::getTableName();
            $stmt = $db->prepare($sql);

            $stmt->execute();
            $result = $stmt->fetchAll();

            return $result;
        }

        public static function  getHotelsWithComment( $data )
        {
            $db = ConnectDB();

            $sql = '
SELECT
    h.*,
    COUNT(c.id) as comments_count,
    c.cat as category
  FROM ' . self::getTableName() . ' AS h
    LEFT JOIN
       ' . CommentTable::getTableName() . ' AS c
        ON h.id = c.post_id AND c.cat = "hotel"
  WHERE h.sea_id=:sea_id GROUP BY h.id';

            $stmt = $db->prepare( $sql );
            $stmt->bindValue( ':sea_id', $data->sea_id, PDO::PARAM_INT );

            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }


    }
}


