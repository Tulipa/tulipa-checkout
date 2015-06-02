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
//desbloqueando página
setTimeout(function() {
        tulipa.unblockUI();
}, 1000);
setTimeout(function() {
	tulipa("input[name*='email']").completer({
		separator: "@",
		source: ["gmail.com", "hotmail.com", "outlook.com","live.com","yahoo.com.br"]
	});
}, 1000);
//fim document ready
});