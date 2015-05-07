<?php
	require('funcoes.php');
	$getCaptchaToken = getCaptchaToken();
	
	// pf, seja mais criativo
	if(!is_array($getCaptchaToken))
	{
		echo 'Não foi possível obter Captcha e Token';
		exit;
	}
	
	
?>
<html>
	<head>
		<title>CNPJ Autocomplete</title>
	</head>
	<body>
		<form method="post" action="processa.php">
			<span>CNPJ</span>
			<br />
			<input name="cnpj" type="text" maxlength="14" required />
			<br />
			<img src="getcaptcha.php?id=<?php echo $getCaptchaToken[0]; ?>" border="0">
			<br />
			<input name="captcha" type="text" maxlength="6" required />
			<br /><span>Por favor, insira os caracteres</span>
			<input type="hidden" name="viewstate" value="<?php echo $getCaptchaToken[1]; ?>" />
			<br/>
			<input type="submit" value="Enviar"/>
		</form>
	</body>
</html>