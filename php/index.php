<?php 

include('config.php');
include('DB/ConnectDB.php');
include('DB/ConstructDB.php');


if( isset( $_GET['place'] ) )
{
	$data['host'] = isset( $_SERVER["REMOTE_HOST"] ) ? '': gethostbyaddr( $_SERVER["REMOTE_ADDR"] );
	$data['addr'] = $_SERVER['REMOTE_ADDR'];
	$data['port'] = $_SERVER['REMOTE_PORT'];
	$data['place'] = $_GET['place'];

	include('DB/tables/VisitsAllTable.php');
   
    $count = VisitsAllTable::isVisit( $data );

    if( $count == 0 ){
    	$last_id = VisitsAllTable::addVisit( $data );
    }

    echo $last_id;
} 
else if( isset( $_GET['name'] ) && $_GET['name'] == 'seas')
{
	include('DB/tables/SeaTable.php');
	include('DB/tables/NewsTable.php');

	$seas = SeaTable::getSeasFields();
	echo json_encode( $seas );
}
else if( isset( $_GET['name'] ) && $_GET['name'] == 'news' )
{
	include('DB/tables/NewsTable.php');

	$news = NewsTable::getNews();
	echo json_encode( $news );
}

