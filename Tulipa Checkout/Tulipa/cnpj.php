<?php 

    require_once '../app/Mage.php';
	Mage::app();
error_reporting(E_ALL ^ E_NOTICE);
	$base_path = Mage::getBaseDir('base');
	require($base_path.'/skin/frontend/base/default/deivison/consulta-cnpj/funcoes.php');
	$getCaptchaToken = getCaptchaToken();
	if(!is_array($getCaptchaToken)){
		echo 'Não foi possível obter Captcha e Token';
		exit;
	}
?>
            <form id="formconsultacnpj" method="post" action="">
			<input name="consultacnpj" type="text" style="display:none;" />
			<img src="<?=Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_SKIN)?>frontend/base/default/deivison/consulta-cnpj/getcaptcha.php?id=<?php echo $getCaptchaToken[0]; ?>" border="0">
			<br />
			<input name="captcha" type="text" maxlength="6" required />
			<br /><span id="msgcnpj">Por favor, insira os caracteres</span>
			<input type="hidden" name="viewstate" value="<?php echo $getCaptchaToken[1]; ?>" />
			<br/>
			<input type="button" id="btcnpj" onClick="buscarCNPJ('<?=Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_SKIN) ?>')" value="Enviar"/>
			</form>