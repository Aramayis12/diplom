<?php
if ( interface_exists( 'ConstructDB' ) ) {
    class VisitsAllTable implements ConstructDB {
        private static $tableName = 'visits_all_table';
        private static $tableFields = array(
            'id' => 'id',
            'host' => 'host',
            'addr' => 'addr',
            'port' => 'port',
            'place' => 'place'
        );

        public static function getTableName()
        {
            return self::$tableName;
        }

        public static function getTableFields()
        {
            return self::$tableFields;
        }

        public static function addVisit( $data )
        {
            $db = ConnectDB();

            $sql = '
INSERT INTO ' . self::getTableName() . ' ( host, addr, place)
VALUES ( :host, :addr, :place )
            ';

            $stmt = $db->prepare( $sql );

            
            $stmt->bindValue( ':host', $data["host"], PDO::PARAM_STR );
            $stmt->bindValue( ':addr', $data["addr"], PDO::PARAM_STR );
            $stmt->bindValue( ':place', $data["place"], PDO::PARAM_STR );
            

            $stmt->execute();
            $lastInsertId = $db->lastInsertId(); 
            
            return $lastInsertId;
        }

        public static function isVisit( $data )
        {
            $db = ConnectDB();

            $where = ' host= :host AND addr= :addr AND port= :port AND place= :place';

            $sql = 'SELECT * FROM ' . self::getTableName() . ' WHERE ' . $where;
            $stmt = $db->prepare( $sql );

            
            $stmt->bindValue( ':host', $data["host"], PDO::PARAM_STR );
            $stmt->bindValue( ':addr', $data["addr"], PDO::PARAM_STR );
            $stmt->bindValue( ':port', $data["port"], PDO::PARAM_INT );
            $stmt->bindValue( ':place', $data["place"], PDO::PARAM_STR );
            

            $stmt->execute();

            $count = $stmt->rowCount();
            return $count;
        }
    }
}