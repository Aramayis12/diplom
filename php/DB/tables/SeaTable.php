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

        public static function  getSeasFields()
        {
            $db = ConnectDB();

            $sql = '
SELECT sea.*, count( news.id ) AS count 
FROM ' . self::getTableName() . ' AS sea
    LEFT JOIN 
     ' . NewsTable::getTableName() . ' AS news
        ON sea.id = news.sea_id 
GROUP BY sea.id';

            $stmt = $db->prepare( $sql );

            $stmt->execute();

            $result = $stmt->fetchAll();
            return $result;
        }

    }
}

