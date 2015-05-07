tulipa(document).ready(function(){  	
   tulipa('.geradorsenha').pGenerator({
        'bind': 'click',
        //'passwordElement': '#password,#confirmation',
        'displayElement': '.senhagerada b',
        'passwordLength': 16,
        'uppercase': true,
        'lowercase': true,
        'numbers':   true,
        'specialChars': true,
		'onPasswordGenerated': function(generatedPassword) {
        tulipa('#password,#confirmation,input[name*="customer_password"],input[name*="confirm_password"]').val(generatedPassword).trigger("change");
		tulipa('.senhagerada').fadeIn('slow');
       }
    });
});