tulipa(document).ready(function() {
//personalizando campos radio e checkbox
    tulipa('input').on('ifClicked', function(event) {
        var tipop = this.id;
        switch (tipop) {
            case 'newFisica':
                tulipa("#tipopessoa").val("Fisica").change();
                break;
            case 'newJuridica':
                tulipa("#tipopessoa").val("Juridica").change();
                break;
            case 'change_password':
                tulipa("#change_password").click();
                break;
            case 'shipping:same_as_billing':
                tulipa("input[name*='same_as_billing']").click();
                break;
        }
    }).iCheck({
        radioClass: 'iradio_square-grey',
        checkboxClass: 'icheckbox_square-grey',
        increaseArea: '20%'
    });
//fim ready
});