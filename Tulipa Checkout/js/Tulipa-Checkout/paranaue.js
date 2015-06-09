jQuery(document).ready(function() {
    // adicionando classe no div igual ao for do label do campo
    jQuery('div#bill_form div').addClass(function() {
            return jQuery(this).find('label').attr('for')
        })
        //ocultando first name e last name
    jQuery("div.name-firstname,div.name-lastname").hide();
    // copiando first e last name para newnome caso usuário seja cadastrado
    var prinome = jQuery("input[name='billing[firstname]']").val();
    var ultnome = jQuery("input[name='billing[lastname]']").val();
    var newnome = jQuery("#newnome").val()
    if ((newnome == "") && (prinome != "") && (ultnome != "")) {
        jQuery("#newnome").val(prinome + ' ' + ultnome);
    }
	//copia o cpf pro taxvat
	jQuery("input[name*='billing[cpfcnpj]']").on('blur', function() {
        cpf = jQuery(this).val();
        jQuery("input[name*='billing[taxvat]']").val(cpf);
    });
//desativando autocomplete do email
jQuery('input[name*="email"]').attr('autocomplete','off');	
    jQuery("input[name*='fax'],input[name*='telephone']").bind("change keyup input",function() {
		verteloucel();
		formok();  
    });
	jQuery('#newnome,.bilemail,input[name*="rg"],input[name*="cpfcnpj"],input[name*="day"],input[name*="month"],input[name*="year"],input[name*="postcode"],input[id*="street1"],input[id*="street2"],input[name*="street4"],input[name*="city"],input[name*="region"],#ie').bind("change keyup input",function() {
		billok();
		formok();	
	});
	jQuery('input[name*="customer_password"],input[name*="confirm_password"]').bind("change keyup input",function() {
		senhaok();
		billok();
		formok();	
	});
//fim document ready
});
//checa se telefone ou celular está preenchido
function verteloucel(){
	if (jQuery("input[name*='telephone']").val() == ""){
            jQuery("input[name*='telephone']").addClass('campoobr');
            jQuery("p.msgcampo.teleoucel").fadeIn("slow");
			dtel = false;
    } else {
            jQuery("p.teleoucel").fadeOut("slow");
			jQuery("input[name*='telephone']").removeClass('campoobr');
			dtel = true;
    }
}
function billok(){
	if (jQuery('.selecttp').val() == 'Fisica') {
		if ((jQuery('input[name*="firstname"]').val() != '') && (jQuery('input[name*="lastname"]').val() != '') &&	(jQuery('.bilemail').val() != '') && (jQuery('input[name*="rg"]').val() != '') && (jQuery('input[name*="cpfcnpj"]').val() != '') && (jQuery('input[name*="day"]').val() != '') && (jQuery('input[name*="month"]').val() != '') && (jQuery('input[name*="year"]').val() != '') && (jQuery('input[name*="postcode"]').val() != '') &&	(jQuery('input[id*="street1"]').val() != '') &&	(jQuery('input[id*="street2"]').val() != '') &&	(jQuery('input[id*="street4"]').val() != '') && (jQuery('input[name*="city"]').val() != '')) {
			dpes = true;
		} else {
			dpes = false;
		}
	} else if (jQuery('.selecttp').val() == 'Juridica') {
		if ((jQuery('input[name*="firstname"]').val() != '') && (jQuery('input[name*="lastname"]').val() != '') &&	(jQuery('.bilemail').val() != '') && (jQuery('input[name*="cpfcnpj"]').val() != '') && (jQuery('input[name*="postcode"]').val() != '') && (jQuery('input[id*="street1"]').val() != '') &&	(jQuery('input[id*="street2"]').val() != '') &&	(jQuery('input[id*="street4"]').val() != '') && (jQuery('input[name*="city"]').val() != '')) {
			dpes = true;
		} else {
			dpes = false;
		}
	}
}
function senhaok(){
//senhas são iguais?
	if ((jQuery('input[name*="customer_password"]').val() == "") && (jQuery('input[name*="confirm_password"]').val() == "")) {
		jQuery('p.msgsenhas').fadeOut("slow");
		dsen = false;
	} else if ((jQuery('input[name*="customer_password"]').val() == jQuery('input[name*="confirm_password"]').val()) && (jQuery('input[name*="customer_password"]').val() != "") && (jQuery('input[name*="confirm_password"]').val() != "")) {
		jQuery('p.msgsenhas').fadeOut("slow");
		jQuery('input[name*="confirm_password"]').removeClass('campoobr');
		dsen = true;
	} else {
		jQuery('p.msgsenhas').fadeIn("slow");
		jQuery('input[name*="confirm_password"]').addClass('campoobr');
		dsen = false;
	} if ((jQuery('input[name*="customer_password"]').val() == '') || (jQuery('input[name*="confirm_password"]').val() == '')) {
		dsen = false;
	}
}
function formok(){
//console.log('dpes = '+dpes+' dsen = '+dsen+' dtel = '+dtel);
//libera submit
	if (dpes && dsen && dtel) {
//exibindo bt de cadastro
		jQuery('form#onepagecheckout_orderform #checkout-review-submit div.buttons-set button.button[type="submit"]').removeAttr('disabled');
		jQuery('form#onepagecheckout_orderform #checkout-review-submit div.buttons-set button.button').removeClass('btdesativado');
		jQuery('p.btsubmit').fadeOut("slow");
	} else {
//bloqueando bt de cadastro
		jQuery('form#onepagecheckout_orderform #checkout-review-submit div.buttons-set button.button[type="submit"]').attr('disabled', 'disabled');
		jQuery('form#onepagecheckout_orderform #checkout-review-submit div.buttons-set button.button').addClass('btdesativado');
		jQuery('p.btsubmit').fadeIn("slow");
	}
}
	billok();
	senhaok();
	verteloucel();
	formok(); 