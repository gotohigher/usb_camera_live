<?php


date_default_timezone_set('Europe/Moscow');
define('SITE_NAME', 'TradingMachine.ai');
define("MAIN_URL", $main_url);
define('FIRSTKEY', 'Kk5Ua3slxdBrxghS1aaW5AYgWZRV0tIe5eI0yPchFz4=');
define('SECONDKEY', 'At49mFi3TlAey1b2w4Y7lVDuqO+SRxGXsaanctnr/JmMrA2vN6EJhrvddVZbxaQs5jpSe34X3ejFK/o9+Y5c83w==');
define('API_URL', $api_url);
define('WEBHOOK_SECRET', $webhook_secret);



function secured_encrypt($data)
{
	$first_key = base64_decode(FIRSTKEY);
	$second_key = base64_decode(SECONDKEY);

	$method = "aes-256-cbc";
	$iv_length = openssl_cipher_iv_length($method);
	$iv = openssl_random_pseudo_bytes($iv_length);

	$first_encrypted = openssl_encrypt($data, $method, $first_key, OPENSSL_RAW_DATA, $iv);
	$second_encrypted = hash_hmac('sha3-512', $first_encrypted, $second_key, TRUE);

	$output = base64_encode($iv . $second_encrypted . $first_encrypted);
	return $output;
}


function secured_decrypt($input)
{
	$first_key = base64_decode(FIRSTKEY);
	$second_key = base64_decode(SECONDKEY);
	$mix = base64_decode($input);

	$method = "aes-256-cbc";
	$iv_length = openssl_cipher_iv_length($method);

	$iv = substr($mix, 0, $iv_length);
	$second_encrypted = substr($mix, $iv_length, 64);
	$first_encrypted = substr($mix, $iv_length + 64);

	$data = openssl_decrypt($first_encrypted, $method, $first_key, OPENSSL_RAW_DATA, $iv);
	$second_encrypted_new = hash_hmac('sha3-512', $first_encrypted, $second_key, TRUE);

	if (hash_equals($second_encrypted, $second_encrypted_new))
		return $data;

	return false;
}

