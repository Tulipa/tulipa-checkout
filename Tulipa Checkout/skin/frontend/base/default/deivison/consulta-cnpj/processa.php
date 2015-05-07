<?php
	require('funcoes.php');
	$cnpj = $_POST['consultacnpj'];
	$captcha = $_POST['captcha'];
	$token = $_POST['viewstate'];
	$getHtmlCNPJ = getHtmlCNPJ($cnpj, $captcha, $token);
	if($getHtmlCNPJ)
	{
		$campos = parseHtmlCNPJ($getHtmlCNPJ);
		$dados =  array(
						"dataAber"=>$campos["dataAber"],
						"nomeEmpre"=>$campos["nomeEmpre"],
						"tituloEstab"=>$campos["tituloEstab"],
						"codDescAtivEconPrin"=>$campos["codDescAtivEconPrin"],
						"codDescAtivEconSec"=>$campos["codDescAtivEconSec"],
						"codDescNatJur"=>$campos["codDescNatJur"],
						"logradouro"=>$campos["logradouro"],
						"numero"=>$campos["numero"],
						"complemento"=>$campos["complemento"],
						"cep"=>$campos["cep"],
						"bairro"=>$campos["bairro"],
						"municipio"=>$campos["municipio"],
						"uf"=>$campos["uf"],
						"sitCad"=>$campos["sitCad"],
						"dataSitCad"=>$campos["dataSitCad"],
						"motivoSitCad"=>$campos["motivoSitCad"],
						"sitEsp"=>$campos["sitEsp"],
						"dataSitEsp"=>$campos["dataSitEsp"]
					  );
	switch ( $dados['uf'] ){
            case "AC": $uf = 'Acre';               $estado = 1;  $num = 485; break;
            case "AL": $uf = 'Alagoas';            $estado = 2;  $num = 486; break;
            case "AP": $uf = 'Amapa';              $estado = 3;  $num = 487; break;
            case "AM": $uf = 'Amazonas';           $estado = 4;  $num = 488; break;
            case "BA": $uf = 'Bahia';              $estado = 5;  $num = 489; break;
            case "CE": $uf = 'Ceara';              $estado = 6;  $num = 490; break;
            case "ES": $uf = 'Espirito Santo';     $estado = 8;  $num = 491; break;
            case "GO": $uf = 'Goias';              $estado = 9;  $num = 492; break;
            case "MA": $uf = 'Maranhao';           $estado = 10; $num = 493; break;
            case "MT": $uf = 'Mato Grosso';        $estado = 12; $num = 494; break;
            case "MS": $uf = 'Mato Grosso do Sul'; $estado = 12; $num = 495; break;
            case "MG": $uf = 'Minas Gerais';       $estado = 13; $num = 496; break;
            case "PA": $uf = 'Para';               $estado = 14; $num = 497; break;
            case "PB": $uf = 'Paraiba';            $estado = 15; $num = 498; break;
            case "PR": $uf = 'Parana';             $estado = 16; $num = 499; break;
            case "PE": $uf = 'Pernambuco';         $estado = 17; $num = 500; break;
            case "PI": $uf = 'Piaui';              $estado = 18; $num = 501; break;
            case "RJ": $uf = 'Rio de Janeiro';     $estado = 19; $num = 502; break;
            case "RN": $uf = 'Rio Grande do Norte';$estado = 20; $num = 503; break;
            case "RS": $uf = 'Rio Grande do Sul';  $estado = 21; $num = 504; break;
            case "RO": $uf = 'Rondonia';           $estado = 22; $num = 505; break;
            case "RR": $uf = 'Roraima';            $estado = 23; $num = 506; break;
            case "SC": $uf = 'Santa Catarina';     $estado = 24; $num = 507; break;
            case "SP": $uf = 'Sao Paulo';          $estado = 25; $num = 508; break;
            case "SE": $uf = 'Sergipe';            $estado = 26; $num = 509; break;
            case "TO": $uf = 'Tocantins';          $estado = 27; $num = 510; break;
            case "DF": $uf = 'Distrito Federal';   $estado = 7;  $num = 511; break;
        }
            $dados['codigo'] = $num;
            $dados['indice'] = $estado;
            $dados['uf_extenso'] = $uf;				
	 echo json_encode($dados);
}else {
        $texto = false;
        echo $texto;
};
?>