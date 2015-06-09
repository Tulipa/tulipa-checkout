jQuery(document).ready(function() {
// desativando enter
    jQuery('#form-validate').on('keydown', 'input', function(event) {
        if (event.which == 13) {
            event.preventDefault();
            var tcampo = jQuery(event.target);
            var index = parseFloat(tcampo.attr('data-index'));
            jQuery('[data-index="' + (index + 1).toString() + '"]').focus();
        }
    });
//desativando autocomplete do email
jQuery('input[id*="email"]').attr('autocomplete','off');	
// adicionando classe no div igual ao for do label do campo
    jQuery('form#form-validate li').addClass(function() {
            return jQuery(this).find('label').attr('for')
    })
// Mudando texto do dob
    jQuery("div.customer-dob label[for='day']").html('&nbsp; dia');
    jQuery("div.customer-dob label[for='month']").html('&nbsp; mês');
    jQuery("div.customer-dob label[for='year']").html('&nbsp; ano');
    jQuery("li.firstname").hide(); 
//ocultando first name e last name
// copiando first e last name para newnome caso usuário seja cadastrado
    if ((document.location.href.indexOf('customer/account/edit/') > -1) && (jQuery("#newnome").val() == "")) { //url atual contém customer/account/edit/ e #newnome está vazio?
        var prinome = jQuery("input#firstname").val();
        var ultnome = jQuery("input#lastname").val();
        jQuery("#newnome").val(prinome + ' ' + ultnome);
    }
//copia valor do estado ao selecionar manual
    jQuery('select[name="billing[region_id]"]').on('change', function() {
        vuf = jQuery(this).val();
        jQuery("#region").val(vuf).change();
    });
//copia o cpf pro taxvat
	jQuery('#cpfcnpj').on('blur', function() {
        cpf = jQuery(this).val();
        jQuery("#taxvat").val(cpf);
    });
//fim document ready
});