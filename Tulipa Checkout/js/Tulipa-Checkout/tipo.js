tulipa(document).ready(function() {
    // adicionando ordem dos campos
    tulipa('#newnome').attr('data-index', '3');
    tulipa('input[name*="email"]').attr('data-index', '4');
    tulipa('input[name*="cpfcnpj"]').attr('data-index', '1');
    //copia o nome para os campos first name e last name
    tulipa("#newnome").blur(function() {
        var nomecliente = tulipa.trim(tulipa(this).val());
        var prinome = nomecliente.substr(0, nomecliente.indexOf(' '));
        var ultnome = nomecliente.substr(nomecliente.indexOf(' ') + 1);
		prinome = tulipa.trim(prinome.replace( /\s\s+/g, ' ' )); //removendo espaços
		ultnome = tulipa.trim(ultnome.replace( /\s\s+/g, ' ' )); //removendo espaços
        tulipa("input[name='billing[firstname]'],#firstname").val(prinome);
        tulipa("input[name='billing[lastname]'],#lastname").val(ultnome);
        if (tulipa("input[name='billing[firstname]'],#firstname").val() == "") {
            tulipa("#newnome").focus().addClass('campoobr');
            tulipa("p.msgcampo.nomefull").show();
        } else {
            tulipa("p.nomefull").hide();
			tulipa("#newnome").removeClass('campoobr');
        }
    });
	 tulipa(".validar_cpf").blur(function() {
		var taxvatcpf = tulipa(this).val();
		tulipa('input[name*="taxvat"]').val(taxvatcpf);
    });
	 tulipa("input[id*='day'],input[id*='month'],input[id*='year']").blur(function() {
		 //teste
		var datacompleta = new Date();
		var mesabrev = datacompleta.getMonth()+"";if(mesabrev.length==1)  mesabrev="0" +mesabrev;
		var dataabrev = datacompleta.getDate()+"";if(dataabrev.length==1) dataabrev="0" +dataabrev;
		var anoatual = datacompleta.getFullYear();
     	var dia = tulipa("input[id*='day']").val();
		var mes = tulipa("input[id*='month']").val();
		var ano = tulipa("input[id*='year']").val();
		if((dia != "") && (mes != "") && (ano != "")){
    		if (mes < 1 || mes > 12) {
        		tulipa("input[id*='month']").focus().addClass('campoobr');
				tulipa('.msgdob1').show();
			} else{
				tulipa('.msgdob1').hide();
				tulipa("input[id*='month']").removeClass('campoobr');
				}
			if ((mes==4 || mes==6 || mes==9 || mes==11) && dia ==31) {
				tulipa("input[id*='day']").focus().addClass('campoobr');
				tulipa('.msgdob3').show();
			} else{
				tulipa('.msgdob3').hide();
				tulipa("input[id*='day']").removeClass('campoobr');
				}
			if (mes == 2){
	        	var bisexto = (ano % 4 == 0 && (ano % 100 != 0 || ano % 400 == 0));
        		if (dia > 28 && !bisexto) {
					tulipa("input[id*='day']").focus().addClass('campoobr');
					tulipa('.msgdob4').show();
				}else if (dia > 29  && bisexto) {
					tulipa("input[id*='day']").focus().addClass('campoobr');
					tulipa('.msgdob5').show();
				}else{
		 			tulipa('.msgdob4,.msgdob5').hide();
					tulipa("input[id*='day']").removeClass('campoobr');
				}	
			}else if (dia < 1 || dia > 31) {
        		tulipa("input[id*='day']").focus().addClass('campoobr');
				tulipa('.msgdob2').show();
			}else{
				tulipa('.msgdob2').hide();
				tulipa("input[id*='day']").removeClass('campoobr');
				}
			if(ano > anoatual){
				tulipa("input[id*='year']").focus().addClass('campoobr');
				tulipa('.msgdob6').show();
			}else{
				tulipa('.msgdob6').hide();
				tulipa("input[id*='year']").removeClass('campoobr');
			}
		}
    });
    //criando os radios
    tulipa('#tipopessoa,.selecttp').each(function(i, select) { //Get Exising Select Options - select do tipo de pessoa vira radio buttons  
        select = tulipa(select);
        select.find('option').each(function(j, option) {
            option = tulipa(option);
            var radio = tulipa('<input type="radio" />'); // Create a radio:          
            radio.attr('name', 'new' + select.attr('name')).attr('value', option.val()).attr('id', 'new' + option.val()); // Set name and value:           
            if (option.attr('selected')) radio.attr('checked', 'checked'); // Set checked if the option was selected  
            select.before(radio); // Insert radio before select box:
            select.before( // Insert a label:
                tulipa("<label />").attr('for', option.attr('value')).text(option.text()));
        });
        tulipa('#tipopessoa,.selecttp').hide();
    });
    // fisica
    function tippesfisica() {
            tulipa('#tipopessoa,.selecttp').val('Fisica');
            //tulipa('#tipopessoa,.selecttp').trigger('change');
            tulipa('.validar_cpf').unmask();
            tulipa('.validar_cpf').mask("999.999.999-99");
            tulipa('#ie').removeAttr('data-index');
            tulipa('input[name*="rg"]').attr('data-index', '2');
            tulipa('input[name*="day"]').attr('data-index', '5');
            tulipa('input[name*="month"]').attr('data-index', '6');
            tulipa('input[name*="year"]').attr('data-index', '7');
            tulipa('input[name*="telephone"]').attr('data-index', '8');
            tulipa('input[name*="fax"]').attr('data-index', '9');
            tulipa('input[name*="postcode"]').attr('data-index', '10');
            tulipa('input[id*="street1"]').attr('data-index', '11');
            tulipa('input[id*="street2"]').attr('data-index', '12');
            tulipa('input[id*="street3"]').attr('data-index', '13');
            tulipa('input[id*="bairro"],input[id*="street4"]').attr('data-index', '14');
            tulipa('input[name*="city"]').attr('data-index', '15');
            tulipa('input[name*="password"],input[name*="customer_password"]').attr('data-index', '16');
            tulipa('input[name*="confirmation"],input[name*="confirm_password"]').attr('data-index', '17');
            tulipa('label[for="cpfcnpj"],label[for*="taxvat"]').text('CPF*');
			tulipa('ul.form-list>li.month>label[for="month"],div.two_fields>div.short>label[for*="month"]').text('Data de Nascimento*');
			tulipa('label[for="newnome"]').text('Nome Completo*');
            // mostrar
            tulipa('li.rg,li.month,div.rg,div[class*="month"]').show();
            tulipa('#rg,#day,#month,#year').addClass('required-entry');
            tulipa('label[for="rg"],label[for="day"],label[for="month"],label[for="year"]').addClass('required');
            tulipa('li.ie,div.ie').hide();
            //ocultar
            tulipa('#ie').val('');
			tulipa('.msgcnpj').hide();
        }
        //juridica

    function tippesjuridica() {
        tulipa('#tipopessoa,.selecttp').val('Juridica');
        //tulipa('#tipopessoa,.selecttp').trigger('change');
        tulipa('.validar_cpf').unmask();
        tulipa('.validar_cpf').mask("99.999.999/9999-99");
        tulipa('input[name*="rg"]').removeAttr('data-index');
        tulipa('input[name*="day"]').removeAttr('data-index').val('');
        tulipa('input[name*="month"]').removeAttr('data-index').val('');
        tulipa('input[name*="year"]').removeAttr('data-index').val('');
        tulipa('#ie').attr('data-index', '2');
        tulipa('input[name*="telephone"]').attr('data-index', '5');
        tulipa('input[name*="fax"]').attr('data-index', '6');
        tulipa('input[name*="postcode"]').attr('data-index', '7');
        tulipa('input[id*="street1"]').attr('data-index', '8');
        tulipa('input[id*="street2"]').attr('data-index', '9');
        tulipa('input[id*="street3"]').attr('data-index', '10');
        tulipa('input[id*="bairro"],input[id*="street4"]').attr('data-index', '11');
        tulipa('input[name*="city"]').attr('data-index', '12');
        tulipa('input[name*="password"],input[name*="customer_password"]').attr('data-index', '13');
        tulipa('input[name*="confirmation"],input[name*="confirm_password"]').attr('data-index', '14');
        //mostrar
        tulipa('label[for="cpfcnpj"],label[for*="taxvat"]').text('CNPJ*');
		tulipa('label[for="newnome"]').text('Razão Social ou Nome Fantasia*');
        tulipa('li.ie,div.ie').show();
        //ocultar
        tulipa('li.rg,li.month,div.rg,div[class*="month"]').hide();
        tulipa('#rg,#day,#month,#year').removeClass('required-entry').val('');
        tulipa('label[for="rg"],label[for="day"],label[for="month"],label[for="year"]').removeClass('required');
    }
    if (tulipa('#tipopessoa,.selecttp').val() == 'Juridica') {
        tippesjuridica();
    } else if (tulipa('#tipopessoa,.selecttp').val() == 'Fisica') {
        tippesfisica();
    }
    //copiando valor do radio do tipo de pessoa para o select oculto ao selecionar uma opção
    tulipa('input[type=radio][name=newtipopessoa],input[name="newbilling[tipopessoa]"]').on('change', function() {
        switch (tulipa(this).val()) {
            case 'Fisica': //alert("Física");
                tulipa("#tipopessoa,.selecttp").val("Fisica").change();
                break;
            case 'Juridica': //alert("Jurídica");           
                tulipa("#tipopessoa,.selecttp").val("Juridica").change();
                break;
        }
    });
    // Oculta campos se Física ou Jurídica
    tulipa('#tipopessoa,.selecttp').change(function() {
        if (this.value == 'Juridica') { //se for jurídica
            tulipa('.validar_cpf').val('');
            tippesjuridica();
        } else if (this.value == 'Fisica') { //se for física
            tulipa('.validar_cpf').val('');
            tippesfisica();
        }
    });
    //fim document ready
});