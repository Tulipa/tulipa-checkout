jQuery(document).ready(function() {
//personalizando campos radio e checkbox
    jQuery('input').on('ifClicked', function(event) {
        var tipop = this.id;
        switch (tipop) {
            case 'newFisica':
                jQuery("#tipopessoa").val("Fisica").change();
                break;
            case 'newJuridica':
                jQuery("#tipopessoa").val("Juridica").change();
                break;
            case 'change_password':
                jQuery("#change_password").click();
                break;
            case 'shipping:same_as_billing':
                jQuery("input[name*='same_as_billing']").click();
                break;
        }
    }).iCheck({
        radioClass: 'iradio_square-grey',
        checkboxClass: 'icheckbox_square-grey',
        increaseArea: '20%'
    });
//fim ready
});