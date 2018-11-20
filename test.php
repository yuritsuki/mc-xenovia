<?php

$listBookID = 888256;
$name = 'imya';
$level = 'level';
$phone = '322231';

$data = array(
	'email' 	=> 'vir2ozzz@mail.ru',
        'name'	=> $name,
        'level'	=> $level,
);

require_once('sendpulseInterface.php');
require_once('sendpulse.php');

define('API_USER_ID', 'd211790f91d02d188b44f95c6cdad40e');
define('API_SECRET', 'b662a1c4a6dfc5f497d7d09d57db4d3b');
define('TOKEN_STORAGE', 'file');

$SPApiProxy = new SendpulseApi(API_USER_ID, API_SECRET, TOKEN_STORAGE);
var_dump($SPApiProxy->addEmails($listBookID, $data));