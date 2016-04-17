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
    }
}


