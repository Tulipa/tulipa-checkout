tulipa(document).ready(function() {
tulipa('#cpfcnpj,input[id*="taxvat"]').blur(function() {
	if(tulipa('#tipopessoa').val() == "Juridica"){
		valorcnpj = tulipa('input[name*="cpfcnpj"]').val();
		if(valorcnpj != "__.___.___/____-__"){
			urlatual = window.location.protocol +"//"+ window.location.host + window.location.pathname;
			if(urlatual.indexOf("/loja/") >= 0){
					newurlatual = window.location.protocol +"//"+ window.location.host+'/loja/Tulipa/cnpj.php';
				}
			else if(urlatual.indexOf("/site/") >= 0){
					newurlatual = window.location.protocol +"//"+ window.location.host+'/site/Tulipa/cnpj.php';
				}
			else if(urlatual.indexOf("/leo/") >= 0){
					newurlatual = window.location.protocol +"//"+ window.location.host+'/leo/Tulipa/cnpj.php';
				}
			else if(urlatual.indexOf("/rafa/") >= 0){
					newurlatual = window.location.protocol +"//"+ window.location.host+'/rafa/Tulipa/cnpj.php';
				}
			else if(urlatual.indexOf("/novo/") >= 0){
					newurlatual = window.location.protocol +"//"+ window.location.host+'/novo/Tulipa/cnpj.php';
				}
			else{
					newurlatual = window.location.protocol +"//"+ window.location.host+'/Tulipa/cnpj.php';
				}	
			tulipa("#consultaexterna").load(newurlatual,function() {
  				tulipa('input[name="consultacnpj"]').val(tulipa('#cpfcnpj,input[id*="taxvat"]').val().replace(/[^\d]/g, ''));
			});
			tulipa.fancybox.open(
			[{
        	href : '#consultaexterna'
   			}],{
			autoSize: false,
			width:250,
			height:120  
			});
		}
	}
});
//fim ready
 });
 function buscarCNPJ(serverurl) {
		tulipa.fancybox.close('#consultaexterna');
//loading
		tulipa.blockUI({
			message: 'Buscando informações, aguarde...',
			css: {border: 'none', backgroundColor: 'none', color: '#fff' }
        });
		tulipa.ajax({
				url:serverurl + 'frontend/base/default/deivison/consulta-cnpj/processa.php',
				type:'POST',
				dataType: 'html',
            	timeout: 7000,
				data:tulipa('#formconsultacnpj').serialize()
		 })		
		.done(function(respostaCNPJ){
				objcnpj =tulipa.parseJSON(respostaCNPJ);
				if(objcnpj.nomeEmpre == null){
					tulipa('.msgcnpj').show();
					tulipa('.campomsg').css({'margin-bottom':'15px'});
					}
				else{
					tulipa('.msgcnpj').hide();
					tulipa('.campomsg').css({'margin-bottom':'8px'});
					tulipa('#newnome').val(objcnpj.nomeEmpre);
					tulipa('input[name*="postcode"]').val(objcnpj.cep);
					tulipa('input[id*="bairro"]').val(objcnpj.bairro);
					tulipa('input[id*="city"]').val(objcnpj.municipio);
					tulipa('input[id*="street1"]').val(objcnpj.logradouro);
					tulipa('input[id*="street2"]').val(objcnpj.numero);
					tulipa('input[id*="street3"]').val(objcnpj.complemento);
					tulipa('select[id*="region_id"]').val(objcnpj.codigo);
					tulipa('input[id*="region"]').val(objcnpj.codigo);	
					tulipa('.msgcep').hide();
					}
				//console.log(objcnpj);		
		})
		.fail(function(){
				tulipa('.msgcnpj').show();
		})
		.always(function(){
					tulipa.unblockUI(); 
		});
};