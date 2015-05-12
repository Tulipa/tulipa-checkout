tulipa(document).ready(function() {
// desativando enter
    tulipa('#form-validate').on('keydown', 'input', function(event) {
        if (event.which == 13) {
            event.preventDefault();
            var tcampo = tulipa(event.target);
            var index = parseFloat(tcampo.attr('data-index'));
            tulipa('[data-index="' + (index + 1).toString() + '"]').focus();
        }
    });
//desativando autocomplete do email
tulipa('input[id*="email"]').attr('autocomplete','off');	
// adicionando classe no div igual ao for do label do campo
    tulipa('form#form-validate li').addClass(function() {
            return tulipa(this).find('label').attr('for')
    })
// Mudando texto do dob
    tulipa("div.customer-dob label[for='day']").html('&nbsp; dia');
    tulipa("div.customer-dob label[for='month']").html('&nbsp; mês');
    tulipa("div.customer-dob label[for='year']").html('&nbsp; ano');
    tulipa("li.firstname").hide(); 
//ocultando first name e last name
// copiando first e last name para newnome caso usuário seja cadastrado
    if ((document.location.href.indexOf('customer/account/edit/') > -1) && (tulipa("#newnome").val() == "")) { //url atual contém customer/account/edit/ e #newnome está vazio?
        var prinome = tulipa("input#firstname").val();
        var ultnome = tulipa("input#lastname").val();
        tulipa("#newnome").val(prinome + ' ' + ultnome);
    }
//copia valor do estado ao selecionar manual
    tulipa('select[name="billing[region_id]"]').on('change', function() {
        vuf = tulipa(this).val();
        tulipa("#region").val(vuf).change();
    });
//copia o cpf pro taxvat
	jQuery('#cpfcnpj').on('blur', function() {
        cpf = jQuery(this).val();
        jQuery("#taxvat").val(cpf);
    });
//fim document ready
});