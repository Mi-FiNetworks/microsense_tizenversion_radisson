<?php
class dbconnection
{
public function connection()
{
           
            
				$dbhost = 'localhost';
				$dbuser = 'root';
				$dbpass = 'Passw0rd!@#';
				$dbname ='radisson';
				$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
				if(! $conn )
				{
					die('Could not connect: ' . mysqli_error());
				}
				
				///mysqli_select_db($conn,'radisson');
				return $conn;
                                
       }

}


?>
