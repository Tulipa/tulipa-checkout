jQuery(document).ready(function() {
    var dpes, dend, dsen = false;
    mostraend();
	mostrasenha();
	senhasiguais();
	verteloucel();
	formok();
	jQuery('label[for*="street2"]').text('Número*');
    //desbloqueando página
    setTimeout(function() {
        jQuery.unblockUI();
        //exibindo form
        jQuery('div.dadospessoais').fadeIn('slow');
		setTimeout(function() {
			jQuery("input[name*='email']").completer({
				separator: "@",
				source: ["gmail.com", "hotmail.com", "outlook.com","live.com","yahoo.com.br"]
			});
		}, 1000);
    }, 1000);
	jQuery("#newnome,#email_address,#rg,#cpfcnpj,#day,#month,#year,#ie").bind("change keyup input",function() {
		 mostraend();
		 formok();
    });
	jQuery('#telephone,#fax,input[name="postcode"],input[id*="street1"],input[id*="street2"],input[id*="bairro"],input[name="city"],#region').bind("change keyup input",function() {
		 mostrasenha();
		 formok();
    });
    jQuery("#password,#confirmation").bind("change keyup input",function() {
		senhasiguais();
		formok();
    });
	jQuery("#fax,#telephone").bind("change keyup input",function() {
		verteloucel();
    });
//fim document ready
});
function mostraend(){
// Mostra Bloco de endereço
	if (jQuery('#tipopessoa').val() == 'Fisica') {
		if ((jQuery('#newnome').val() != '') && (jQuery('#email_address').val() != '') && (jQuery('#rg').val() != '') && (jQuery('#cpfcnpj').val() != '') && (jQuery('#day').val() != '') && (jQuery('#month').val() != '') && (jQuery('#year').val() != '')) {
//exibindo form
			jQuery('div.infoendereco').fadeIn('slow');
			dpes = true;
		} else {
			dpes = false;
		}
	} else if (jQuery('#tipopessoa').val() == 'Juridica') {
		if ((jQuery('#newnome').val() != '') && (jQuery('#email_address').val() != '') && (jQuery('#cpfcnpj').val() != '')) {
//exibindo form
			jQuery('div.infoendereco').fadeIn('slow');
			dpes = true;
		} else {
			dpes = false;
		}
	}
}
function formok(){
// libera submit
	if (dpes && dend && dsen) {
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
function mostrasenha(){
	// Mostra senha
	if (((jQuery('#telephone').val() != '') && (jQuery('input[name="postcode"]').val() != '') && (jQuery('input[id*="street1"]').val() != '') && (jQuery('input[id*="street2"]').val() != '') && (jQuery('input[id*="bairro"]').val() != '') && (jQuery('input[name="city"]').val() != '') && (jQuery('#region').val() != '')) || ((jQuery('#fax').val() != '') && (jQuery('input[name="postcode"]').val() != '') && (jQuery('input[id*="street1"]').val() != '') && (jQuery('input[id*="street2"]').val() != '') && (jQuery('input[id*="bairro"]').val() != '') && (jQuery('input[name="city"]').val() != '') && (jQuery('#region').val() != ''))) {
		//exibindo form
		jQuery('div.dadosacesso').fadeIn('slow');
		dend = true;
	} else {
		dend = false;
	}
	formok();
}
function senhasiguais(){
// senhas são iguais?
	if ((jQuery('#password').val() == "") && (jQuery('#confirmation').val() == "")) {
		jQuery('p.msgsenhas').fadeOut("slow");
		jQuery('#confirmation').removeClass('campoobr');
		dsen = false;
	} else if ((jQuery('#password').val() == jQuery('#confirmation').val()) && (jQuery('#password').val() != "") && (jQuery('#confirmation').val() != "")) {
		jQuery('p.msgsenhas').fadeOut("slow");
		jQuery('#confirmation').removeClass('campoobr');
		dsen = true;
	} else {
		jQuery('p.msgsenhas').fadeIn("slow");
		jQuery('#confirmation').addClass('campoobr');
		dsen = false;
	}
	if ((jQuery('#password').val() == '') || (jQuery('#confirmation').val() == '')) {
		dsen = false;
	}
	formok();	
}
//checa se telefone ou celular está preenchido
function verteloucel(){
		if (jQuery("#telephone").val() == ""){
			jQuery("#telephone").addClass('campoobr');
			jQuery("p.msgcampo.teleoucel").fadeIn("slow");
			dtel = false;
		} else {
			jQuery("p.teleoucel").fadeOut("slow");
			jQuery("#telephone").removeClass('campoobr');
			dtel = true;
		}
		formok();
}