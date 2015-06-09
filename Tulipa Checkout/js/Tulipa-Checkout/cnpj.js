jQuery(document).ready(function() {
jQuery('#cpfcnpj,input[id*="taxvat"]').blur(function() {
	if(jQuery('#tipopessoa').val() == "Juridica"){
		valorcnpj = jQuery('input[name*="cpfcnpj"]').val();
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
			else if(urlatual.indexOf("/leonardo/") >= 0){
					newurlatual = window.location.protocol +"//"+ window.location.host+'/leonardo/Tulipa/cnpj.php';
				}
			else if(urlatual.indexOf("/novo/") >= 0){
					newurlatual = window.location.protocol +"//"+ window.location.host+'/novo/Tulipa/cnpj.php';
				}
			else{
					newurlatual = window.location.protocol +"//"+ window.location.host+'/Tulipa/cnpj.php';
				}	
			jQuery("#consultaexterna").load(newurlatual,function() {
  				jQuery('input[name="consultacnpj"]').val(jQuery('#cpfcnpj,input[id*="taxvat"]').val().replace(/[^\d]/g, ''));
			});
			jQuery.fancybox.open(
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
		jQuery.fancybox.close('#consultaexterna');
//loading
		jQuery.blockUI({
			message: 'Buscando informações, aguarde...',
			css: {border: 'none', backgroundColor: 'none', color: '#fff' }
        });
		jQuery.ajax({
				url:serverurl + 'frontend/base/default/deivison/consulta-cnpj/processa.php',
				type:'POST',
				dataType: 'html',
            	timeout: 7000,
				data:jQuery('#formconsultacnpj').serialize()
		 })		
		.done(function(respostaCNPJ){
				objcnpj =jQuery.parseJSON(respostaCNPJ);
				if(objcnpj.nomeEmpre == null){
					jQuery('.msgcnpj').show();
					jQuery('.campomsg').css({'margin-bottom':'15px'});
					}
				else{
					jQuery('.msgcnpj').hide();
					jQuery('.campomsg').css({'margin-bottom':'8px'});
					jQuery('#newnome').val(objcnpj.nomeEmpre);
					jQuery('input[name*="postcode"]').val(objcnpj.cep);
					jQuery('input[id*="bairro"]').val(objcnpj.bairro);
					jQuery('input[id*="city"]').val(objcnpj.municipio);
					jQuery('input[id*="street1"]').val(objcnpj.logradouro);
					jQuery('input[id*="street2"]').val(objcnpj.numero);
					jQuery('input[id*="street3"]').val(objcnpj.complemento);
					jQuery('select[id*="region_id"]').val(objcnpj.codigo);
					jQuery('input[id*="region"]').val(objcnpj.codigo);	
					jQuery('.msgcep').hide();
					}
				//console.log(objcnpj);		
		})
		.fail(function(){
				jQuery('.msgcnpj').show();
		})
		.always(function(){
					jQuery.unblockUI(); 
		});
};