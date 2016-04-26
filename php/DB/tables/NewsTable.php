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

        public static function  getNewsWithComment( $data )
        {
            $db = ConnectDB();

            $sql = '
SELECT
    n.*,
    COUNT(c.id) as comments_count,
    c.cat as category
  FROM ' . self::getTableName() . ' AS n
    LEFT JOIN
       ' . CommentTable::getTableName() . ' AS c
        ON n.id = c.post_id AND c.cat = "news"
  WHERE n.sea_id=:sea_id GROUP BY n.id';

            $stmt = $db->prepare( $sql );
            $stmt->bindValue( ':sea_id', $data->sea_id, PDO::PARAM_INT );

            $stmt->execute();

            $result = $stmt->fetchAll();
            return $result;
        }




    }
}