<?php
include "conf.php";
if ($_REQUEST['encrypted_text']) {
	echo secured_decrypt($_REQUEST['encrypted_text']);
}

if ($_REQUEST['un_encrypted_text']) {
	echo secured_encrypt($_REQUEST['un_encrypted_text']);
}


// echo secured_decrypt("3Pkt2Bks0M8bl7NXXVmeYYIEMNlF3wDyMJdSj+Fm4ZmW+ANQT21v5rseUibbj6sTYirnxOWSMaWzUBC+11MaYnjaM6cDwqMkswndNMzqqW7IT0z5faIAidPrDaQE8dFhaej16z8Go/8d94U3QAi1BMt7ADUV4J7DORWa635kpD4=");