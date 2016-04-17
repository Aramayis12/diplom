<?php
if (interface_exists('ConstructDB')) {
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

        public static function  getNews()
        {
            $db = ConnectDB();

            $sql = 'SELECT * FROM ' . self::getTableName();
            $stmt = $db->prepare( $sql );

            $stmt->execute();

            $result = $stmt->fetchAll();
            return $result;
        }

    }
}