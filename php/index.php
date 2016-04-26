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
else if( isset( $_GET['name'] ) && $_GET['name'] == 'news' && !isset( $_GET['join'] ) )
{
	include('DB/tables/NewsTable.php');

	$news = NewsTable::getNews();
	echo json_encode( $news );
}
else if( isset( $_GET['name'] ) && $_GET['name'] == 'hotels' && !isset($_GET['join']))
{
	include('DB/tables/HotelTable.php');

	$news = HotelTable::getHotels();
	echo json_encode( $news );
}
else if( isset( $_GET['name'] ) && $_GET['name'] == 'comment' && isset( $_GET['action'] ) && $_GET['action'] == 'add' && isset( $_GET['cat'] ) && $_GET['cat'] == 'hotel')
{
	include('DB/tables/CommentTable.php');

	$data = json_decode( $_POST["data"] );
	$result = CommentTable::insertComment( $data );
	echo json_encode( $result );
}
else if( isset( $_GET['name'] ) && $_GET['name'] == 'comment' && isset( $_GET['action'] ) && $_GET['action'] == 'get')
{
	include('DB/tables/CommentTable.php');

	$data = json_decode( $_POST["data"] );
	
	$result = CommentTable::getComment( $data );

	echo json_encode( $result );
}
else if( isset( $_GET['name'] ) && $_GET['name'] == 'news' && isset( $_GET['join'] ) && $_GET['join'] == 'comment' )
{
	include('DB/tables/NewsTable.php');
	include('DB/tables/CommentTable.php');

	$data = json_decode( $_POST['data'] );
	$news = NewsTable::getNewsWithComment( $data );
	echo json_encode( $news );
}
else if( isset( $_GET['name'] ) && $_GET['name'] == 'hotels' && isset( $_GET['join'] ) && $_GET['join'] == 'comment')
{
	include('DB/tables/HotelTable.php');
	include('DB/tables/CommentTable.php');

	$data = json_decode( $_POST['data'] );
	$result = HotelTable::getHotelsWithComment( $data );
	echo json_encode( $result );
}
else if( isset( $_GET['name'] ) && $_GET['name'] == 'comment' && isset( $_GET['action'] ) && $_GET['action'] == 'add' && isset( $_GET['cat'] ) && $_GET['cat'] == 'news')
{
	include('DB/tables/CommentTable.php');

	$data = json_decode( $_POST["data"] );
	$result = CommentTable::insertComment( $data );

	echo json_encode( $result );
}
