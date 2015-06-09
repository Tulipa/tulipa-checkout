jQuery(document).ready(function() {
    // adicionando ordem dos campos
    jQuery('#newnome').attr('data-index', '3');
    jQuery('input[name*="email"]').attr('data-index', '4');
    jQuery('input[name*="cpfcnpj"]').attr('data-index', '1');
    //copia o nome para os campos first name e last name
    jQuery("#newnome").blur(function() {
        var nomecliente = jQuery.trim(jQuery(this).val());
        var prinome = nomecliente.substr(0, nomecliente.indexOf(' '));
        var ultnome = nomecliente.substr(nomecliente.indexOf(' ') + 1);
		prinome = jQuery.trim(prinome.replace( /\s\s+/g, ' ' )); //removendo espaços
		ultnome = jQuery.trim(ultnome.replace( /\s\s+/g, ' ' )); //removendo espaços
        jQuery("input[name='billing[firstname]'],#firstname").val(prinome);
        jQuery("input[name='billing[lastname]'],#lastname").val(ultnome);
        if (jQuery("input[name='billing[firstname]'],#firstname").val() == "") {
            jQuery("#newnome").focus().addClass('campoobr');
            jQuery("p.msgcampo.nomefull").show();
        } else {
            jQuery("p.nomefull").hide();
			jQuery("#newnome").removeClass('campoobr');
        }
    });
	 jQuery(".validar_cpf").blur(function() {
		var taxvatcpf = jQuery(this).val();
		jQuery('input[name*="taxvat"]').val(taxvatcpf);
    });
	 jQuery("input[id*='day'],input[id*='month'],input[id*='year']").blur(function() {
		 //teste
		var datacompleta = new Date();
		var mesabrev = datacompleta.getMonth()+"";if(mesabrev.length==1)  mesabrev="0" +mesabrev;
		var dataabrev = datacompleta.getDate()+"";if(dataabrev.length==1) dataabrev="0" +dataabrev;
		var anoatual = datacompleta.getFullYear();
     	var dia = jQuery("input[id*='day']").val();
		var mes = jQuery("input[id*='month']").val();
		var ano = jQuery("input[id*='year']").val();
		if((dia != "") && (mes != "") && (ano != "")){
    		if (mes < 1 || mes > 12) {
        		jQuery("input[id*='month']").focus().addClass('campoobr');
				jQuery('.msgdob1').show();
			} else{
				jQuery('.msgdob1').hide();
				jQuery("input[id*='month']").removeClass('campoobr');
				}
			if ((mes==4 || mes==6 || mes==9 || mes==11) && dia ==31) {
				jQuery("input[id*='day']").focus().addClass('campoobr');
				jQuery('.msgdob3').show();
			} else{
				jQuery('.msgdob3').hide();
				jQuery("input[id*='day']").removeClass('campoobr');
				}
			if (mes == 2){
	        	var bisexto = (ano % 4 == 0 && (ano % 100 != 0 || ano % 400 == 0));
        		if (dia > 28 && !bisexto) {
					jQuery("input[id*='day']").focus().addClass('campoobr');
					jQuery('.msgdob4').show();
				}else if (dia > 29  && bisexto) {
					jQuery("input[id*='day']").focus().addClass('campoobr');
					jQuery('.msgdob5').show();
				}else{
		 			jQuery('.msgdob4,.msgdob5').hide();
					jQuery("input[id*='day']").removeClass('campoobr');
				}	
			}else if (dia < 1 || dia > 31) {
        		jQuery("input[id*='day']").focus().addClass('campoobr');
				jQuery('.msgdob2').show();
			}else{
				jQuery('.msgdob2').hide();
				jQuery("input[id*='day']").removeClass('campoobr');
				}
			if(ano > anoatual){
				jQuery("input[id*='year']").focus().addClass('campoobr');
				jQuery('.msgdob6').show();
			}else{
				jQuery('.msgdob6').hide();
				jQuery("input[id*='year']").removeClass('campoobr');
			}
		}
    });
    //criando os radios
    jQuery('#tipopessoa,.selecttp').each(function(i, select) { //Get Exising Select Options - select do tipo de pessoa vira radio buttons  
        select = jQuery(select);
        select.find('option').each(function(j, option) {
            option = jQuery(option);
            var radio = jQuery('<input type="radio" />'); // Create a radio:          
            radio.attr('name', 'new' + select.attr('name')).attr('value', option.val()).attr('id', 'new' + option.val()); // Set name and value:           
            if (option.attr('selected')) radio.attr('checked', 'checked'); // Set checked if the option was selected  
            select.before(radio); // Insert radio before select box:
            select.before( // Insert a label:
                jQuery("<label />").attr('for', option.attr('value')).text(option.text()));
        });
        jQuery('#tipopessoa,.selecttp').hide();
    });
    // fisica
    function tippesfisica() {
            jQuery('#tipopessoa,.selecttp').val('Fisica');
            //jQuery('#tipopessoa,.selecttp').trigger('change');
            jQuery('.validar_cpf').unmask();
            jQuery('.validar_cpf').mask("999.999.999-99");
            jQuery('#ie').removeAttr('data-index');
            jQuery('input[name*="rg"]').attr('data-index', '2');
            jQuery('input[name*="day"]').attr('data-index', '5');
            jQuery('input[name*="month"]').attr('data-index', '6');
            jQuery('input[name*="year"]').attr('data-index', '7');
            jQuery('input[name*="telephone"]').attr('data-index', '8');
            jQuery('input[name*="fax"]').attr('data-index', '9');
            jQuery('input[name*="postcode"]').attr('data-index', '10');
            jQuery('input[id*="street1"]').attr('data-index', '11');
            jQuery('input[id*="street2"]').attr('data-index', '12');
            jQuery('input[id*="street3"]').attr('data-index', '13');
            jQuery('input[id*="bairro"],input[id*="street4"]').attr('data-index', '14');
            jQuery('input[name*="city"]').attr('data-index', '15');
            jQuery('input[name*="password"],input[name*="customer_password"]').attr('data-index', '16');
            jQuery('input[name*="confirmation"],input[name*="confirm_password"]').attr('data-index', '17');
            jQuery('label[for="cpfcnpj"],label[for*="taxvat"]').text('CPF*');
			jQuery('ul.form-list>li.month>label[for="month"],div.two_fields>div.short>label[for*="month"]').text('Data de Nascimento*');
			jQuery('label[for="newnome"]').text('Nome Completo*');
            // mostrar
            jQuery('li.rg,li.month,div.rg,div[class*="month"]').show();
            jQuery('#rg,#day,#month,#year').addClass('required-entry');
            jQuery('label[for="rg"],label[for="day"],label[for="month"],label[for="year"]').addClass('required');
            jQuery('li.ie,div.ie').hide();
            //ocultar
            jQuery('#ie').val('');
			jQuery('.msgcnpj').hide();
        }
        //juridica

    function tippesjuridica() {
        jQuery('#tipopessoa,.selecttp').val('Juridica');
        //jQuery('#tipopessoa,.selecttp').trigger('change');
        jQuery('.validar_cpf').unmask();
        jQuery('.validar_cpf').mask("99.999.999/9999-99");
        jQuery('input[name*="rg"]').removeAttr('data-index');
        jQuery('input[name*="day"]').removeAttr('data-index').val('');
        jQuery('input[name*="month"]').removeAttr('data-index').val('');
        jQuery('input[name*="year"]').removeAttr('data-index').val('');
        jQuery('#ie').attr('data-index', '2');
        jQuery('input[name*="telephone"]').attr('data-index', '5');
        jQuery('input[name*="fax"]').attr('data-index', '6');
        jQuery('input[name*="postcode"]').attr('data-index', '7');
        jQuery('input[id*="street1"]').attr('data-index', '8');
        jQuery('input[id*="street2"]').attr('data-index', '9');
        jQuery('input[id*="street3"]').attr('data-index', '10');
        jQuery('input[id*="bairro"],input[id*="street4"]').attr('data-index', '11');
        jQuery('input[name*="city"]').attr('data-index', '12');
        jQuery('input[name*="password"],input[name*="customer_password"]').attr('data-index', '13');
        jQuery('input[name*="confirmation"],input[name*="confirm_password"]').attr('data-index', '14');
        //mostrar
        jQuery('label[for="cpfcnpj"],label[for*="taxvat"]').text('CNPJ*');
		jQuery('label[for="newnome"]').text('Razão Social ou Nome Fantasia*');
        jQuery('li.ie,div.ie').show();
        //ocultar
        jQuery('li.rg,li.month,div.rg,div[class*="month"]').hide();
        jQuery('#rg,#day,#month,#year').removeClass('required-entry').val('');
        jQuery('label[for="rg"],label[for="day"],label[for="month"],label[for="year"]').removeClass('required');
    }
    if (jQuery('#tipopessoa,.selecttp').val() == 'Juridica') {
        tippesjuridica();
    } else if (jQuery('#tipopessoa,.selecttp').val() == 'Fisica') {
        tippesfisica();
    }
    //copiando valor do radio do tipo de pessoa para o select oculto ao selecionar uma opção
    jQuery('input[type=radio][name=newtipopessoa],input[name="newbilling[tipopessoa]"]').on('change', function() {
        switch (jQuery(this).val()) {
            case 'Fisica': //alert("Física");
                jQuery("#tipopessoa,.selecttp").val("Fisica").change();
                break;
            case 'Juridica': //alert("Jurídica");           
                jQuery("#tipopessoa,.selecttp").val("Juridica").change();
                break;
        }
    });
    // Oculta campos se Física ou Jurídica
    jQuery('#tipopessoa,.selecttp').change(function() {
        if (this.value == 'Juridica') { //se for jurídica
            jQuery('.validar_cpf').val('');
            tippesjuridica();
        } else if (this.value == 'Fisica') { //se for física
            jQuery('.validar_cpf').val('');
            tippesfisica();
        }
    });
    //fim document ready
});