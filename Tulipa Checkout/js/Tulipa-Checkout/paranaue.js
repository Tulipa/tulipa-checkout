tulipa(document).ready(function() {
    // adicionando classe no div igual ao for do label do campo
    tulipa('div#bill_form div').addClass(function() {
            return tulipa(this).find('label').attr('for')
        })
        //ocultando first name e last name
    tulipa("div.name-firstname,div.name-lastname").hide();
    // copiando first e last name para newnome caso usuário seja cadastrado
    var prinome = tulipa("input[name='billing[firstname]']").val();
    var ultnome = tulipa("input[name='billing[lastname]']").val();
    var newnome = tulipa("#newnome").val()
    if ((newnome == "") && (prinome != "") && (ultnome != "")) {
        tulipa("#newnome").val(prinome + ' ' + ultnome);
    }
	//copia o cpf pro taxvat
	tulipa("input[name*='billing[cpfcnpj]']").on('blur', function() {
        cpf = tulipa(this).val();
        tulipa("input[name*='billing[taxvat]']").val(cpf);
    });
//desativando autocomplete do email
tulipa('input[name*="email"]').attr('autocomplete','off');	
    tulipa("input[name*='fax'],input[name*='telephone']").bind("change keyup input",function() {
		verteloucel();
		formok();  
    });
	tulipa('#newnome,.bilemail,input[name*="rg"],input[name*="cpfcnpj"],input[name*="day"],input[name*="month"],input[name*="year"],input[name*="postcode"],input[id*="street1"],input[id*="street2"],input[name*="street4"],input[name*="city"],input[name*="region"],#ie').bind("change keyup input",function() {
		billok();
		formok();	
	});
	tulipa('input[name*="customer_password"],input[name*="confirm_password"]').bind("change keyup input",function() {
		senhaok();
		billok();
		formok();	
	});
//fim document ready
});
//checa se telefone ou celular está preenchido
function verteloucel(){
	if (tulipa("input[name*='telephone']").val() == ""){
            tulipa("input[name*='telephone']").addClass('campoobr');
            tulipa("p.msgcampo.teleoucel").fadeIn("slow");
			dtel = false;
    } else {
            tulipa("p.teleoucel").fadeOut("slow");
			tulipa("input[name*='telephone']").removeClass('campoobr');
			dtel = true;
    }
}
function billok(){
	if (tulipa('.selecttp').val() == 'Fisica') {
		if ((tulipa('input[name*="firstname"]').val() != '') && (tulipa('input[name*="lastname"]').val() != '') &&	(tulipa('.bilemail').val() != '') && (tulipa('input[name*="rg"]').val() != '') && (tulipa('input[name*="cpfcnpj"]').val() != '') && (tulipa('input[name*="day"]').val() != '') && (tulipa('input[name*="month"]').val() != '') && (tulipa('input[name*="year"]').val() != '') && (tulipa('input[name*="postcode"]').val() != '') &&	(tulipa('input[id*="street1"]').val() != '') &&	(tulipa('input[id*="street2"]').val() != '') &&	(tulipa('input[id*="street4"]').val() != '') && (tulipa('input[name*="city"]').val() != '')) {
			dpes = true;
		} else {
			dpes = false;
		}
	} else if (tulipa('.selecttp').val() == 'Juridica') {
		if ((tulipa('input[name*="firstname"]').val() != '') && (tulipa('input[name*="lastname"]').val() != '') &&	(tulipa('.bilemail').val() != '') && (tulipa('input[name*="cpfcnpj"]').val() != '') && (tulipa('input[name*="postcode"]').val() != '') && (tulipa('input[id*="street1"]').val() != '') &&	(tulipa('input[id*="street2"]').val() != '') &&	(tulipa('input[id*="street4"]').val() != '') && (tulipa('input[name*="city"]').val() != '')) {
			dpes = true;
		} else {
			dpes = false;
		}
	}
}
function senhaok(){
//senhas são iguais?
	if ((tulipa('input[name*="customer_password"]').val() == "") && (tulipa('input[name*="confirm_password"]').val() == "")) {
		tulipa('p.msgsenhas').fadeOut("slow");
		dsen = false;
	} else if ((tulipa('input[name*="customer_password"]').val() == tulipa('input[name*="confirm_password"]').val()) && (tulipa('input[name*="customer_password"]').val() != "") && (tulipa('input[name*="confirm_password"]').val() != "")) {
		tulipa('p.msgsenhas').fadeOut("slow");
		tulipa('input[name*="confirm_password"]').removeClass('campoobr');
		dsen = true;
	} else {
		tulipa('p.msgsenhas').fadeIn("slow");
		tulipa('input[name*="confirm_password"]').addClass('campoobr');
		dsen = false;
	} if ((tulipa('input[name*="customer_password"]').val() == '') || (tulipa('input[name*="confirm_password"]').val() == '')) {
		dsen = false;
	}
}
function formok(){
//console.log('dpes = '+dpes+' dsen = '+dsen+' dtel = '+dtel);
//libera submit
	if (dpes && dsen && dtel) {
//exibindo bt de cadastro
		tulipa('form#onepagecheckout_orderform #checkout-review-submit div.buttons-set button.button[type="submit"]').removeAttr('disabled');
		tulipa('form#onepagecheckout_orderform #checkout-review-submit div.buttons-set button.button').removeClass('btdesativado');
		tulipa('p.btsubmit').fadeOut("slow");
	} else {
//bloqueando bt de cadastro
		tulipa('form#onepagecheckout_orderform #checkout-review-submit div.buttons-set button.button[type="submit"]').attr('disabled', 'disabled');
		tulipa('form#onepagecheckout_orderform #checkout-review-submit div.buttons-set button.button').addClass('btdesativado');
		tulipa('p.btsubmit').fadeIn("slow");
	}
}
	billok();
	senhaok();
	verteloucel();
	formok(); 