var dend,dtel = false;
tulipa(document).ready(function() {
//adicionando ordem dos campos
    tulipa('input[name*="telephone"]').attr('data-index', '1');
    tulipa('input[name*="fax"]').attr('data-index', '2');
    tulipa('input[name*="postcode"]').attr('data-index', '3');
    tulipa('input[id*="street1"]').attr('data-index', '4');
    tulipa('input[id*="street2"]').attr('data-index', '5');
    tulipa('input[id*="street3"]').attr('data-index', '6');
    tulipa('input[id*="bairro"]').attr('data-index', '7');
    tulipa('input[name*="city"]').attr('data-index', '8');
//desativando enter
    tulipa('#form-validate').on('keydown', 'input', function(event) {
        if (event.which == 13) {
            event.preventDefault();
            var tcampo = tulipa(event.target);
            var index = parseFloat(tcampo.attr('data-index'));
            tulipa('[data-index="' + (index + 1).toString() + '"]').focus();
        }
    });
//adicionando classe no div igual ao for do label do campo
    tulipa('form#form-validate li').addClass(function() {
            return tulipa(this).find('label').attr('for')
        })
//adiciona valor no uf
    vuf = tulipa('select[name="billing[region_id]').val();
    tulipa("#region").val(vuf).change();
//ocultando campos
    tulipa("li.firstname,li.company,li.tipopessoa,li.rg,li.cpfcnpj,li.ie,li.celular").hide();
    tulipa('#firstname,#lastname,#company,#tipopessoa,#rg,#cpfcnpj,#ie,#celular').removeClass('required-entry');
    tulipa('label[for="firstname"],label[for="lastname"],label[for="company"],label[for="tipopessoa"],label[for="rg"],label[for="cpfcnpj"],label[for="ie"],label[for="celular"]').removeClass('required');
//copia valor do estado ao selecionar manual
    tulipa('select[name="billing[region_id]"]').on('change', function() {
        vuf = tulipa(this).val();
        tulipa("#region").val(vuf).change();
    });
//validação de campos preenchidos
	endok();
	verteloucel();
    tulipa("#telephone").bind("change keyup input",function() {
		verteloucel();
    });
// Mostra Bloco de endereço
    //setInterval(function() {
	tulipa('input[name*="postcode"],input[id*="street1"],input[id*="street2"],input[id*="bairro"],input[id*="city"],#region').bind("change keyup input",function() {
//há campos vazios?
        endok();
		formok();
	});
//desbloqueando página
    setTimeout(function() {
        tulipa.unblockUI();
//exibindo form
        tulipa('div.infocontato').fadeIn("slow");
        tulipa('div.infoend').fadeIn("slow");
    }, 1000);
//fim document ready
});
function formok(){
//libera submit
        if (dend && dtel) {
//exibindo bt de cadastro
            tulipa('form#form-validate div.buttons-set button.button[type="submit"]').removeAttr('disabled');
            tulipa('form#form-validate div.buttons-set button.button span').removeClass('btdesativado');
            tulipa('p.btsubmit').fadeOut("slow");
        } else {
//bloqueando bt de cadastro
            tulipa('form#form-validate div.buttons-set button.button[type="submit"]').attr('disabled', 'disabled');
            tulipa('form#form-validate div.buttons-set button.button span').addClass('btdesativado');
            tulipa('p.btsubmit').fadeIn("slow");
        }
    //}, 1000);
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
function endok(){
		if (
		(tulipa('input[name*="postcode"]').val() != '') &&
		(tulipa('input[id*="street1"]').val() != '') &&
		(tulipa('input[id*="street2"]').val() != '') &&
		(tulipa('input[id*="bairro"]').val() != '') &&
		(tulipa('input[id*="city"]').val() != '') &&
		(tulipa('#region').val() != '')) {
            dend = true;
        } else {
            dend = false;
        }	
}