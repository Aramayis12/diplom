<?php

class UploadFiles {
    private static $size = 10000000;
    private static $img_types = array('jpg', 'jpeg', 'gif', 'png');


    public static function upload( $file , $file_name ){

        $explode = explode('.',$file['name']);
        $file_type = end( $explode );

        $uploadError = true;
        if( $file['size'] > self::$size ){
            $uploadError = true;
        }

        if( $uploadError != false ){
            if( in_array( $file_type, self::$img_types ) ){
                return self::img( $file , $file_name, $file_type);
            }
        }

        return false;

    }

    private static function img ( $file, $file_name, $file_type ){

        $structure = '../assets/imgs/seas/'. $file_name . '/pictures';
        if( !is_dir ( $structure ) ){
            mkdir( $structure, 0777, true );
        } else {
            if( $file_name != 'News' )
            {
                $files = glob( $structure . '/*'); 
                foreach( $files as $fileIn ){ 
                  if( is_file( $fileIn ) )
                    unlink( $fileIn ); 
                }
            }
        }

        $path = 'assets/imgs/seas/'. $file_name . '/pictures';

        $tmp_name = $file[ "tmp_name" ];
        $name = uniqid(rand(), true) . '.' . $file_type;

        if( move_uploaded_file( $tmp_name, "$structure/$name" ) ){
            return "$path/$name";
        }

        return false;

    }
}