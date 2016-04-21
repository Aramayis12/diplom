<?php


include('config.php');
include('DB/ConnectDB.php');
include('DB/ConstructDB.php');



if( $_GET['action'] == 'get' && $_GET['name'] == 'seas'){
    include('DB/tables/SeaTable.php');

    $result = SeaTable::getSeasFields();
    echo json_encode( $result );
} else if( $_GET['action'] == 'get' && $_GET['name'] == 'hotels'){
    include('DB/tables/HotelTable.php');

    $result = HotelTable::getHotelsFields();
    echo json_encode( $result );
} else if( $_GET['action'] == 'get' && $_GET['name'] == 'hotel'){
    include('DB/tables/SeaTable.php');
    include('DB/tables/HotelTable.php');

    if( $_POST['id'] ){
        $id = $_POST['id'];
        $result = HotelTable::getHotelWithSeaInfo( $id );
        echo json_encode( $result );
    }

} else if( $_GET['action'] == 'set' && $_GET['name'] == 'hotel' ){
    if( isset( $_GET['hotel_ID'] ) ){
        var_dump( $_FILES );
    }

    // sharunakeli

} else if( $_GET['action'] == 'edit' && $_GET['name'] == 'hotel'){
    include('DB/tables/HotelTable.php');

    $data = json_decode( $_POST['data'] );
    $result = HotelTable::updateHotelsFields( $data );
} else if( $_GET['action'] == 'get' && $_GET['name'] == 'news'){
    include('DB/tables/NewsTable.php');

    $result = NewsTable::selectNews();
    echo json_encode( $result );
} else if( $_GET['action'] == 'get' && $_GET['name'] == 'newsOne'){
    include('DB/tables/NewsTable.php');
    include('DB/tables/SeaTable.php');

    if( $_POST['id'] ){
        $id = $_POST['id'];
        $result = NewsTable::getNewsOneWithSeaInfo( $id );
        echo json_encode( $result );
    }
} else if( $_GET['action'] == 'edit' && $_GET['name'] == 'news'){
    include('DB/tables/NewsTable.php');

    $data = json_decode( $_POST['data'] );
    $result = NewsTable::updateNewsFields( $data );
} else if( $_GET['action'] == 'add' && $_GET['name'] == 'news'){
    include('DB/tables/NewsTable.php');

    $data = json_decode( $_POST['data'] );
    $insert_id = NewsTable::insertNews( $data );
    echo $insert_id;
}


