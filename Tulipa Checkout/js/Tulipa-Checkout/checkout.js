tulipa(document).ready(function() {
// desativando enter
    tulipa('#onepagecheckout_orderform').on('keydown', 'input', function(event) {
        if (event.which == 13) {
            event.preventDefault();
            var tcampo = tulipa(event.target);
            var index = parseFloat(tcampo.attr('data-index'));
            tulipa('[data-index="' + (index + 1).toString() + '"]').focus();
        }
    });
//ocultando formas de frete		
    if (tulipa('input[name*="postcode"]').val() == "") {
        tulipa("#onepagecheckout_orderform .col3-set .col-2 div#shipping-method").hide();
    }
//Mostra frete na coluna 2		
    tulipa('#btavancabilling').click(function() {
            tulipa("body.onepagecheckout-index-index div.col-2,#onepagecheckout_orderform .col3-set .col-2 div#shipping-method").fadeIn("slow");
    });
//Mostra Formas de pagamento na coluna 2		
    tulipa('#btavancaentrega').click(function() {
            tulipa("body.onepagecheckout-index-index div.col-2,#onepagecheckout_orderform .col3-set .col-2 div#payment-method,#bttemcupom,#btavancapagamento").fadeIn("slow");
    });
//Mostra Cupom na coluna 2		
    tulipa('#bttemcupom').click(function() {
            tulipa("#onepagecheckout_orderform .col3-set .col-2 div#checkout-coupon-discount-load").fadeIn("slow");
    });
//Mostra Resumo da Compra na coluna 3		
    tulipa('#btavancapagamento').click(function() {
            tulipa("#onepagecheckout_orderform .col3-set .col-2 p.newsletter,#onepagecheckout_orderform .col3-set .col-3").fadeIn("slow");
    });
//desbloqueando página
setTimeout(function() {
        tulipa.unblockUI();
//exibindo form
        tulipa('body.onepagecheckout-index-index div.col-1').fadeIn("slow");
}, 1000);
setTimeout(function() {
	tulipa("input[name*='email']").completer({
		separator: "@",
		source: ["gmail.com", "hotmail.com", "outlook.com","live.com","yahoo.com.br"]
	});
}, 1000);
//fim document ready
});