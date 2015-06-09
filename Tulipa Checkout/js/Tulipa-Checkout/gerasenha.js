jQuery(document).ready(function(){  	
   jQuery('.geradorsenha').pGenerator({
        'bind': 'click',
        //'passwordElement': '#password,#confirmation',
        'displayElement': '.senhagerada b',
        'passwordLength': 16,
        'uppercase': true,
        'lowercase': true,
        'numbers':   true,
        'specialChars': true,
		'onPasswordGenerated': function(generatedPassword) {
        jQuery('#password,#confirmation,input[name*="customer_password"],input[name*="confirm_password"]').val(generatedPassword).trigger("change");
		jQuery('.senhagerada').fadeIn('slow');
       }
    });
});