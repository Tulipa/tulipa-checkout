tulipa(document).ready(function() {
    var dpes, dend, dsen = false;
    mostraend();
	mostrasenha();
	senhasiguais();
	verteloucel();
	formok();
	tulipa('label[for*="street2"]').text('Número*');
    //desbloqueando página
    setTimeout(function() {
        tulipa.unblockUI();
        //exibindo form
        tulipa('div.dadospessoais').fadeIn('slow');
		setTimeout(function() {
			tulipa("input[name*='email']").completer({
				separator: "@",
				source: ["gmail.com", "hotmail.com", "outlook.com","live.com","yahoo.com.br"]
			});
		}, 1000);
    }, 1000);
	tulipa("#newnome,#email_address,#rg,#cpfcnpj,#day,#month,#year,#ie").bind("change keyup input",function() {
		 mostraend();
		 formok();
    });
	tulipa('#telephone,#fax,input[name="postcode"],input[id*="street1"],input[id*="street2"],input[id*="bairro"],input[name="city"],#region').bind("change keyup input",function() {
		 mostrasenha();
		 formok();
    });
    tulipa("#password,#confirmation").bind("change keyup input",function() {
		senhasiguais();
		formok();
    });
	tulipa("#fax,#telephone").bind("change keyup input",function() {
		verteloucel();
    });
//fim document ready
});
function mostraend(){
// Mostra Bloco de endereço
	if (tulipa('#tipopessoa').val() == 'Fisica') {
		if ((tulipa('#newnome').val() != '') && (tulipa('#email_address').val() != '') && (tulipa('#rg').val() != '') && (tulipa('#cpfcnpj').val() != '') && (tulipa('#day').val() != '') && (tulipa('#month').val() != '') && (tulipa('#year').val() != '')) {
//exibindo form
			tulipa('div.infoendereco').fadeIn('slow');
			dpes = true;
		} else {
			dpes = false;
		}
	} else if (tulipa('#tipopessoa').val() == 'Juridica') {
		if ((tulipa('#newnome').val() != '') && (tulipa('#email_address').val() != '') && (tulipa('#cpfcnpj').val() != '')) {
//exibindo form
			tulipa('div.infoendereco').fadeIn('slow');
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
		tulipa('form#form-validate div.buttons-set button.button[type="submit"]').removeAttr('disabled');
		tulipa('form#form-validate div.buttons-set button.button span').removeClass('btdesativado');
		tulipa('p.btsubmit').hide();
	} else {
		//bloqueando bt de cadastro
		tulipa('form#form-validate div.buttons-set button.button[type="submit"]').attr('disabled', 'disabled');
		tulipa('form#form-validate div.buttons-set button.button span').addClass('btdesativado');
		tulipa('p.btsubmit').show();
	}	
}
function mostrasenha(){
	// Mostra senha
	if (((tulipa('#telephone').val() != '') && (tulipa('input[name="postcode"]').val() != '') && (tulipa('input[id*="street1"]').val() != '') && (tulipa('input[id*="street2"]').val() != '') && (tulipa('input[id*="bairro"]').val() != '') && (tulipa('input[name="city"]').val() != '') && (tulipa('#region').val() != '')) || ((tulipa('#fax').val() != '') && (tulipa('input[name="postcode"]').val() != '') && (tulipa('input[id*="street1"]').val() != '') && (tulipa('input[id*="street2"]').val() != '') && (tulipa('input[id*="bairro"]').val() != '') && (tulipa('input[name="city"]').val() != '') && (tulipa('#region').val() != ''))) {
		//exibindo form
		tulipa('div.dadosacesso').fadeIn('slow');
		dend = true;
	} else {
		dend = false;
	}
	formok();
}
function senhasiguais(){
// senhas são iguais?
	if ((tulipa('#password').val() == "") && (tulipa('#confirmation').val() == "")) {
		tulipa('p.msgsenhas').fadeOut("slow");
		tulipa('#confirmation').removeClass('campoobr');
		dsen = false;
	} else if ((tulipa('#password').val() == tulipa('#confirmation').val()) && (tulipa('#password').val() != "") && (tulipa('#confirmation').val() != "")) {
		tulipa('p.msgsenhas').fadeOut("slow");
		tulipa('#confirmation').removeClass('campoobr');
		dsen = true;
	} else {
		tulipa('p.msgsenhas').fadeIn("slow");
		tulipa('#confirmation').addClass('campoobr');
		dsen = false;
	}
	if ((tulipa('#password').val() == '') || (tulipa('#confirmation').val() == '')) {
		dsen = false;
	}
	formok();	
}
//checa se telefone ou celular está preenchido
function verteloucel(){
		if (tulipa("#telephone").val() == ""){
			tulipa("#telephone").addClass('campoobr');
			tulipa("p.msgcampo.teleoucel").fadeIn("slow");
			dtel = false;
		} else {
			tulipa("p.teleoucel").fadeOut("slow");
			tulipa("#telephone").removeClass('campoobr');
			dtel = true;
		}
		formok();
}