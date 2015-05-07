tulipa(document).ready(function(){
// mascarando campos
	tulipa('input[name*="telephone"]').mask("(99) 9999-9999");
	tulipa('input[name*="fax"]').focusout(function() {
    var phone, element;
    element = tulipa(this);
    element.unmask();
    phone = element.val().replace(/\D/g, '');
    if (phone.length > 10) {
    	element.mask("(99) 99999-999?9");
    } else {
    element.mask("(99) 9999-9999?9");
    }
   	}).trigger('focusout');
//cpf e cnpj
	if (tulipa('#tipopessoa').val() == 'Fisica') {
		tulipa('.validar_cpf').mask("999.999.999-99");
	} else if (tulipa('#tipopessoa').val() == 'Juridica') {
		tulipa('.validar_cpf').mask("99.999.999/9999-99");
	}			
//Limita os campos da data nascimento
	tulipa('input[name*="day"]').attr('maxlength','2');
	tulipa('input[name*="month"]').attr('maxlength','2');
	tulipa('input[name*="year"]').attr('maxlength','4');
	tulipa('input[name*="postcode"]').attr('maxlength','8');
	tulipa('input[name*="day"], input[name*="month"],input[name*="year"]').autotab_magic().autotab_filter('numeric');
//Ao se coloca o "-" no CEP não irá calcular o frete caso use o módulo Matrix Rates, pois ele não trabalha com o "-"
//Essa opção é caso queira que toda vez ao se entrar no campo ele limpe-o
    /*tulipa('input[class*="tracoAtivo"]').focus(function(){
		tulipa(this).val('');
	});*/
//Script do traço do cep
	tulipa('input[class*="tracoAtivo"]').keydown( function(e){
		tulipa(this).attr('maxlength','9');
			if (e.keyCode >= 9){
				length = this.value.length;
				if (length == 5)
					this.value += "-";
				}
			});
//fim ready	
});
//Valida CPF e CNPJ
function validaCPF(cpf,pType){
	var cpf_filtrado = "", valor_1 = " ", valor_2 = " ", ch = "";
    var valido = false;
   	for (i = 0; i < cpf.length; i++){
		ch = cpf.substring(i, i + 1);
        if (ch >= "0" && ch <= "9"){
          	cpf_filtrado = cpf_filtrado.toString() + ch.toString()
           	valor_1 = valor_2;
           	valor_2 = ch;
        }
        if ((valor_1 != " ") && (!valido)) valido = !(valor_1 == valor_2);
        }
        if (!valido) cpf_filtrado = "12345678912";
        if (cpf_filtrado.length < 11){
        for (i = 1; i <= (11 - cpf_filtrado.length); i++){cpf_filtrado = "0" + cpf_filtrado;}
        }
       	if(pType <= 1){
       	    if ( ( cpf_filtrado.substring(9,11) == checkCPF( cpf_filtrado.substring(0,9) ) ) && ( cpf_filtrado.substring(11,12)=="") ){return true;}
        	}
        	if((pType == 2) || (pType == 0)){
            	if (cpf_filtrado.length >= 14){
            	    if ( cpf_filtrado.substring(12,14) == checkCNPJ( cpf_filtrado.substring(0,12) ) ){  return true;}
            	}
        	}
    	return false;
}
function checkCNPJ(vCNPJ){
  	var mControle = "";
   	var aTabCNPJ = new Array(5,4,3,2,9,8,7,6,5,4,3,2);
   	for (i = 1 ; i <= 2 ; i++){
       	mSoma = 0;
       	for (j = 0 ; j < vCNPJ.length ; j++)
        	mSoma = mSoma + (vCNPJ.substring(j,j+1) * aTabCNPJ[j]);
        	if (i == 2 ) mSoma = mSoma + ( 2 * mDigito );
	       	mDigito = ( mSoma * 10 ) % 11;
        	if (mDigito == 10 ) mDigito = 0;
    	  	mControle1 = mControle ;
        	mControle = mDigito;
        	aTabCNPJ = new Array(6,5,4,3,2,9,8,7,6,5,4,3);
      	}
	return( (mControle1 * 10) + mControle );
}
function checkCPF(vCPF){
  	var mControle = ""
   	var mContIni = 2, mContFim = 10, mDigito = 0;
   	for (j = 1 ; j <= 2 ; j++){
      	mSoma = 0;
       	for (i = mContIni ; i <= mContFim ; i++)
        	mSoma = mSoma + (vCPF.substring((i-j-1),(i-j)) * (mContFim + 1 + j - i));
        	if (j == 2 ) mSoma = mSoma + ( 2 * mDigito );
        	mDigito = ( mSoma * 10 ) % 11;
        	if (mDigito == 10) mDigito = 0;
        	mControle1 = mControle;
        	mControle = mDigito;
        	mContIni = 3;
        	mContFim = 11;
      	}
	return( (mControle1 * 10) + mControle );
}
var host,quale,cep,prefix,obj;
//Busca de CEP na base dos correios por Ajax
function buscarEndereco(host, quale) {
//loading
		tulipa.blockUI({
			message: 'Buscando CEP, aguarde...',
			css: {border: 'none', backgroundColor: 'none', color: '#fff' }
        });
		prefix = "#"+ quale + "\\:",
		cep = tulipa(prefix+'postcode').val().replace(/[^0-9]+/g, '');
		if (cep.toString().length != 8) {
			tulipa.unblockUI();
			return false;
		}
		tulipa.ajax({
				url: host + 'frontend/base/default/deivison/buscacep.php?cep=' + cep,
				type:'GET',
				dataType: 'html',
            	timeout: 7000
		 })		
		.done(function(respostaCEP){
				//var obj;
				//while(!obj){
				obj = tulipa.parseJSON(respostaCEP);
				//}
				tulipa(prefix+'street1').val(obj.logradouro);
				tulipa(prefix+'street4').val(obj.bairro);
				tulipa(prefix+'bairro').val(obj.bairro);
				tulipa(prefix+'city').val(obj.cidade);
				tulipa('select[id*="region_id"]').val(obj.codigo);
				tulipa('input[id*="region"]').val(obj.codigo);
				tulipa(prefix+'postcode').removeClass('campoobr');
				tulipa('.msgcep').hide();
				tulipa(prefix+'street2').focus();
				if(!obj.logradouro){
					tulipa('.msgcep').show();
					//tulipa(prefix+'postcode').addClass('campoobr').focus();
					tulipa(prefix+'postcode').addClass('campoobr');
				}
				//console.log(obj);
		})
		.fail(function(){
					console.log('Falha!');
		})
		.always(function(){
					tulipa.unblockUI(); 
		});
};