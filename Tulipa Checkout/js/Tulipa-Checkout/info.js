tulipa(document).ready(function() {
    var dpes = false;
    tipopessoa();
    senhaiguais();    
    formok(); 
    //desbloqueando página
    setTimeout(function() {
        tulipa.unblockUI();
        //exibindo form
        tulipa('div.infoedit').show('slow');
		setTimeout(function() {
			tulipa("input[name*='email']").completer({
				separator: "@",
				source: ["gmail.com", "hotmail.com", "outlook.com","live.com","yahoo.com.br"]
			});
		}, 1000);
    }, 1000);
//fim document ready
});
tulipa('#newnome,#email,#rg,#cpfcnpj,#day,#month,#year').bind("change keyup input",function() {
	tipopessoa();
	formok();
});
tulipa('#password,#confirmation').bind("change keyup input",function() {
	senhaiguais();
});  
function tipopessoa(){
	if (tulipa('#tipopessoa').val() == 'Fisica') {
		if ((tulipa('#newnome').val() != '') && (tulipa('#email').val() != '') && (tulipa('#rg').val() != '') && (tulipa('#cpfcnpj').val() != '') && (tulipa('#day').val() != '') && (tulipa('#month').val() != '') && (tulipa('#year').val() != '')) {
			dpes = true;
		} else {
			dpes = false;
		}
	} else if (tulipa('#tipopessoa').val() == 'Juridica') {
		if ((tulipa('#newnome').val() != '') && (tulipa('#email').val() != '') && (tulipa('#cpfcnpj').val() != '')) {
			dpes = true;
		} else {
			dpes = false;
		}
	}	
}
function senhaiguais(){
// senhas são iguais?
	if ((tulipa('#password').val() == "") && (tulipa('#confirmation').val() == "")) {
		tulipa('p.msgsenhas').hide();
		tulipa('#confirmation').removeClass('campoobr');
	} else if ((tulipa('#password').val() == tulipa('#confirmation').val()) && (tulipa('#password').val() != "") && (tulipa('#confirmation').val() != "")) {
		tulipa('p.msgsenhas').hide();
		tulipa('#confirmation').removeClass('campoobr');
	} else {
		tulipa('p.msgsenhas').show();
		tulipa('#confirmation').addClass('campoobr');
	}
}
function formok(){
 // libera submit
	if (dpes) {
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