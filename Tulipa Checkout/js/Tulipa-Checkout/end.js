var dend,dtel = false;
jQuery(document).ready(function() {
//adicionando ordem dos campos
    jQuery('input[name*="telephone"]').attr('data-index', '1');
    jQuery('input[name*="fax"]').attr('data-index', '2');
    jQuery('input[name*="postcode"]').attr('data-index', '3');
    jQuery('input[id*="street1"]').attr('data-index', '4');
    jQuery('input[id*="street2"]').attr('data-index', '5');
    jQuery('input[id*="street3"]').attr('data-index', '6');
    jQuery('input[id*="bairro"]').attr('data-index', '7');
    jQuery('input[name*="city"]').attr('data-index', '8');
//desativando enter
    jQuery('#form-validate').on('keydown', 'input', function(event) {
        if (event.which == 13) {
            event.preventDefault();
            var tcampo = jQuery(event.target);
            var index = parseFloat(tcampo.attr('data-index'));
            jQuery('[data-index="' + (index + 1).toString() + '"]').focus();
        }
    });
//adicionando classe no div igual ao for do label do campo
    jQuery('form#form-validate li').addClass(function() {
            return jQuery(this).find('label').attr('for')
        })
//adiciona valor no uf
    vuf = jQuery('select[name="billing[region_id]"]').val();
    jQuery("#region").val(vuf).change();
//ocultando campos
    jQuery("li.firstname,li.company,li.tipopessoa,li.rg,li.cpfcnpj,li.ie,li.celular").hide();
    jQuery('#firstname,#lastname,#company,#tipopessoa,#rg,#cpfcnpj,#ie,#celular').removeClass('required-entry');
    jQuery('label[for="firstname"],label[for="lastname"],label[for="company"],label[for="tipopessoa"],label[for="rg"],label[for="cpfcnpj"],label[for="ie"],label[for="celular"]').removeClass('required');
//copia valor do estado ao selecionar manual
    jQuery('select[name="billing[region_id]"]').on('change', function() {
        vuf = jQuery(this).val();
        jQuery("#region").val(vuf).change();
    });
//validação de campos preenchidos
	endok();
	verteloucel();
    jQuery("#telephone").bind("change keyup input",function() {
		verteloucel();
    });
// Mostra Bloco de endereço
    //setInterval(function() {
	jQuery('input[name*="postcode"],input[id*="street1"],input[id*="street2"],input[id*="bairro"],input[id*="city"],#region').bind("change keyup input",function() {
//há campos vazios?
        endok();
		formok();
	});
//desbloqueando página
    setTimeout(function() {
        jQuery.unblockUI();
//exibindo form
        jQuery('div.infocontato').fadeIn("slow");
        jQuery('div.infoend').fadeIn("slow");
    }, 1000);
//fim document ready
});
function formok(){
//libera submit
        if (dend && dtel) {
//exibindo bt de cadastro
            jQuery('form#form-validate div.buttons-set button.button[type="submit"]').removeAttr('disabled');
            jQuery('form#form-validate div.buttons-set button.button span').removeClass('btdesativado');
            jQuery('p.btsubmit').fadeOut("slow");
        } else {
//bloqueando bt de cadastro
            jQuery('form#form-validate div.buttons-set button.button[type="submit"]').attr('disabled', 'disabled');
            jQuery('form#form-validate div.buttons-set button.button span').addClass('btdesativado');
            jQuery('p.btsubmit').fadeIn("slow");
        }
    //}, 1000);
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
function endok(){
		if (
		(jQuery('input[name*="postcode"]').val() != '') &&
		(jQuery('input[id*="street1"]').val() != '') &&
		(jQuery('input[id*="street2"]').val() != '') &&
		(jQuery('input[id*="bairro"]').val() != '') &&
		(jQuery('input[id*="city"]').val() != '') &&
		(jQuery('#region').val() != '')) {
            dend = true;
        } else {
            dend = false;
        }	
}