jQuery(document).ready(function() {
    var dpes = false;
    tipopessoa();
    senhaiguais();    
    formok(); 
    //desbloqueando página
    setTimeout(function() {
        jQuery.unblockUI();
        //exibindo form
        jQuery('div.infoedit').show('slow');
		setTimeout(function() {
			jQuery("input[name*='email']").completer({
				separator: "@",
				source: ["gmail.com", "hotmail.com", "outlook.com","live.com","yahoo.com.br"]
			});
		}, 1000);
    }, 1000);
//fim document ready
});
jQuery('#newnome,#email,#rg,#cpfcnpj,#day,#month,#year').bind("change keyup input",function() {
	tipopessoa();
	formok();
});
jQuery('#password,#confirmation').bind("change keyup input",function() {
	senhaiguais();
});  
function tipopessoa(){
	if (jQuery('#tipopessoa').val() == 'Fisica') {
		if ((jQuery('#newnome').val() != '') && (jQuery('#email').val() != '') && (jQuery('#rg').val() != '') && (jQuery('#cpfcnpj').val() != '') && (jQuery('#day').val() != '') && (jQuery('#month').val() != '') && (jQuery('#year').val() != '')) {
			dpes = true;
		} else {
			dpes = false;
		}
	} else if (jQuery('#tipopessoa').val() == 'Juridica') {
		if ((jQuery('#newnome').val() != '') && (jQuery('#email').val() != '') && (jQuery('#cpfcnpj').val() != '')) {
			dpes = true;
		} else {
			dpes = false;
		}
	}	
}
function senhaiguais(){
// senhas são iguais?
	if ((jQuery('#password').val() == "") && (jQuery('#confirmation').val() == "")) {
		jQuery('p.msgsenhas').hide();
		jQuery('#confirmation').removeClass('campoobr');
	} else if ((jQuery('#password').val() == jQuery('#confirmation').val()) && (jQuery('#password').val() != "") && (jQuery('#confirmation').val() != "")) {
		jQuery('p.msgsenhas').hide();
		jQuery('#confirmation').removeClass('campoobr');
	} else {
		jQuery('p.msgsenhas').show();
		jQuery('#confirmation').addClass('campoobr');
	}
}
function formok(){
 // libera submit
	if (dpes) {
		//exibindo bt de cadastro
		jQuery('form#form-validate div.buttons-set button.button[type="submit"]').removeAttr('disabled');
		jQuery('form#form-validate div.buttons-set button.button span').removeClass('btdesativado');
		jQuery('p.btsubmit').hide();
	} else {
		//bloqueando bt de cadastro
		jQuery('form#form-validate div.buttons-set button.button[type="submit"]').attr('disabled', 'disabled');
		jQuery('form#form-validate div.buttons-set button.button span').addClass('btdesativado');
		jQuery('p.btsubmit').show();
	}	
}