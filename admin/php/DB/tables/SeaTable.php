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

        public static function  getSeasFields( $id = null ){

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

    }
}

