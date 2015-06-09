jQuery(document).ready(function() {
// desativando enter
    jQuery('#onepagecheckout_orderform').on('keydown', 'input', function(event) {
        if (event.which == 13) {
            event.preventDefault();
            var tcampo = jQuery(event.target);
            var index = parseFloat(tcampo.attr('data-index'));
            jQuery('[data-index="' + (index + 1).toString() + '"]').focus();
        }
    });
//desbloqueando página
setTimeout(function() {
        jQuery.unblockUI();
}, 1000);
setTimeout(function() {
	jQuery("input[name*='email']").completer({
		separator: "@",
		source: ["gmail.com", "hotmail.com", "outlook.com","live.com","yahoo.com.br"]
	});
}, 1000);
//fim document ready
});