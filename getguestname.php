<?php
include 'phppack/connection.php'; 
//echo $_SERVER['REMOTE_ADDR'];

		$varip=$_SERVER['REMOTE_ADDR'];// trying to track IP addresses of visitors...I get the server's IP address rather than the visitor's.
		
		$tv_IP=$_GET['tvmac'];
		writetologfile($tv_IP,$varip);
		$sqlquery = "SELECT GuestTitle,GuestName FROM guest INNER JOIN tvmaster ON  guest.GuestRoomNo = tvmaster.roomNo where ipaddress='".$tv_IP ."' and GuestStatus='A'";
		//ORDER by rModifiedOn ASC LIMIT 1";//WHERE  ipaddress='".$varip ."' ORDER by rModifiedOn ASC LIMIT 1";
		
		writetologfile($sqlquery,$varip);
		$obj_connection = new dbconnection();

		$resultset_family = mysqli_query( $obj_connection->connection() ,$sqlquery);

		if (! $resultset_family)
			//echo 'Database error: ' . mysqli_error($obj_connection->connection());
			writetologfile('Database error: ' . mysqli_error($obj_connection->connection()),$varip);
			$temp=0;
		while($row = mysqli_fetch_assoc($resultset_family))
		{
			//echo "iteration:".sizeof($row);	
			$line=$resultset_family->num_rows;		
			if($line >1)
			{
			if($temp==0)
			{
			echo $row['GuestTitle']."".$row['GuestName']." & ";
			}else
			{
			echo $row['GuestTitle']."".$row['GuestName'];
			}
			$temp++;
			}else
			{
			echo $row['GuestTitle']."".$row['GuestName'];
			}
		}
		function writetologfile($stringtowrite, $filename)
		{
			$logdate = date('Y-m-d H:i:s');
			$date = date('d-m-y_');
			$folderdate = date('d-m-y');
			if (!file_exists('log/'.$folderdate))	
			{
				mkdir('log/'.$folderdate, 0777, true);
			}

			$myfile = fopen('log/'.$folderdate.'/'.$date .$filename.".txt", "a"); //or 
			if (!$myfile)
			{
				die("Unable to open file!");
			}
			fwrite($myfile, "\r\n".$logdate." ====".$stringtowrite);
			fclose($myfile);
		}
 
?>











