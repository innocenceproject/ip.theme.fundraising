// HTML5 placeholder attribute processing in non-HTML5 browsers
function placeholder(){
    $("input[type=text]").each(function(){
        var phvalue = $(this).attr("placeholder");
        $(this).val(phvalue);
    });
}
placeholder();
$("input[type=text]").focusin(function(){
    var phvalue = $(this).attr("placeholder");
    if (phvalue == $(this).val()) {
    $(this).val("");
    }
});
$("input[type=text]").focusout(function(){
    var phvalue = $(this).attr("placeholder");
    if ($(this).val() == "") {
        $(this).val(phvalue);
    }
});

// Donation form logic
function showHideDonationForm(form) {
    if (form.find('.field-amount input').val() >= 5) {
        form.parents('div.panel').find('.after-amount').slideDown();
    } else {
        form.parents('div.panel').find('.after-amount').slideUp();
    }
}

function processNewAmountValue() {
    var options = $(this).parents('.field').find('.options');
    var form = options.parents('form');
    options.find('.option').removeClass('selected');
    var option = options.find('input[value="' + $(this).val() + '"]');
    option.parent('.option').addClass('selected');
    
    showHideDonationForm(form)

    // Recurly integration
    populateRecurlyQuantity($(this).val());

    // Authorize.net DPM integration
    updateAuthnetDpmFingerprint(form);
}

function updateAuthnetDpmFingerprint(form) {
    if (! form.hasClass('donation-form-authnet-dpm')) {
        return;
    }
    
    var fingerprint_url = form.find('#authnet_dpm_fingerprint_url').val();
    fingerprint_url = fingerprint_url + '?amount='+ form.find('input[name="x_amount"]').val() +'&sequence='+form.find('input[name="x_fp_sequence"]').val()
    
    $.get(fingerprint_url, function (data) {
        $('.donation-form-authnet-dpm input[name="x_fp_hash"]').val(data.x_fp_hash);
        $('.donation-form-authnet-dpm input[name="x_fp_timestamp"]').val(data.x_fp_timestamp);
    }, 'json');
}

function populateRecurlyQuantity(amount) {
    // If there is a Recurly form on the page, set the quantity to amount
    var form = $('#recurly-subscribe form');
    if (form.length != 0) {
        form.find('.field.quantity input').val(amount);
    }
}

function setupRecurlyForm() {
    // Do some mangling of the Recurly form to fit the same general form structure
    var recurly_form = $('#recurly-subscribe');
    
    if (recurly_form.length == 0) {
        return false;
    }

    var address = recurly_form.find('div.address');
    var accepted_cards = recurly_form.find('div.accepted_cards');
    var names = recurly_form.find('.credit_card div.first_name, .credit_card div.last_name');
    var card_cvv = recurly_form.find('div.card_cvv');

    card_cvv.before(accepted_cards);
    names.wrapAll('<div class="field compound name"></div>');

    var button_submit = recurly_form.find('button.submit');
    button_submit.text('Submit').after('<div class="discreet">Your card will be automatically charged every month</div>');
}

function setupAuthnetDpmForm() {
    var form = $('form.donation-form-authnet-dpm')
    if (form.length == 0) {
        return;
    }
    var exp_month = form.find('select.card-expiration-month');
    var exp_year = form.find('select.card-expiration-year');
    var exp_full = form.find('input[name="x_exp_date"]');
    exp_full.val(exp_month.val() + exp_year.val());
    exp_month.change(function () {
        exp_full.val(exp_month.val() + exp_year.val());
    })
    exp_year.change(function () {
        exp_full.val(exp_month.va() + exp_year.va());
    })

    var first_name = form.find("input[name='x_first_name']").change(populateAuthnetDescription);
    var last_name = form.find("input[name='x_last_name']").change(populateAuthnetDescription);
    var amount = form.find("input[name='x_amount']").change(populateAuthnetDescription);
    var description = form.find("input[name='x_description']").change(populateAuthnetDescription);
}

function handleHonoraryTypeChange() {
    var form = $(this).parents('form.donation-form-honorary');
    if ($(this).attr('checked') == true) {
        var honorary_name = form.find('.field-honorary-name')
        var honorary_name_label = honorary_name.find('label')
        if ($(this).val() == 'Memorial') {
            honorary_name_label.text(honorary_name_label.text().replace('honor','memory'));
        }
        if ($(this).val() == 'Honorary') {
            honorary_name_label.text(honorary_name_label.text().replace('memory','honor'));
        }
        honorary_name.slideDown();
        form.find('.field-honorary-send, .fieldset-email-notification').slideDown();
        
        form.find('.form-buttons').slideDown();
    }
    refreshHonoraryEmailPreview(form);
}

function handleHonorarySendChange() {
    var form = $(this).parents('form.donation-form-honorary');
    if ($(this).attr('checked') == true) {
        var honorary_recipient = form.find('.field-honorary-recipient');
        var honorary_message = form.find('.field-honorary-message');
        var email_preview = form.find('.fieldset-email-preview');
        if ($(this).val() == 'Yes') {
            honorary_recipient.slideDown();
            email_preview.slideDown();
            honorary_recipient.find('input').attr('required', 'required');
            honorary_message.slideDown()
        } else {
            honorary_recipient.slideUp();
            email_preview.slideUp();
            honorary_message.slideUp()
            honorary_recipient.find('input').attr('required', '');
        }
    }
    refreshHonoraryEmailPreview(form);
}

function handleHonoraryShowAmountChange() {
    var form = $(this).parents('form.donation-form-honorary');
    refreshHonoraryEmailPreview(form);
}

function refreshHonoraryEmailPreview(form) {
    var preview_fieldset = form.find('.fieldset-email-preview');
    var honorary_send = form.find('input[name="honorary_send"]:checked').val();

    if (honorary_send != 'Yes') {
        preview_fieldset.slideUp();
        return;
    }

    var honorary_type = form.find('input[name="honorary_type"]:checked').val();
    var show_amount = form.find('input[name="show_amount"]:checked').val();

    var preview_href = '';
    if (honorary_type == 'Honorary') {
        if (show_amount == 'Yes') {
            preview_href = preview_fieldset.find('.preview-links a.honorary-preview-with-amount').attr('href');
        } else {
            preview_href = preview_fieldset.find('.preview-links a.honorary-preview-without-amount').attr('href');
        }
    }

    if (honorary_type == 'Memorial') {
        if (show_amount == 'Yes') {
            preview_href = preview_fieldset.find('.preview-links a.memorial-preview-with-amount').attr('href');
        } else {
            preview_href = preview_fieldset.find('.preview-links a.memorial-preview-without-amount').attr('href');
        }
    }

    preview_fieldset.find('.field-email-preview').load(preview_href, function () {$(this).slideDown()});
}

function setupHonoraryForm() {
    var form = $('form.donation-form-honorary');

    if (form.length == 0) {
        return;
    }

    // Handle changes in the type
    var type_input = form.find('.field-honorary-type .option input');
    type_input.change(handleHonoraryTypeChange);
    type_input.change();

    // Handle changes in send
    var send_input = form.find('.field-honorary-send .option input');
    send_input.change(handleHonorarySendChange);
    send_input.change();
    
    // Handle changes in show_amount
    var send_input = form.find('.subfield-show-amount .option input');
    send_input.change(handleHonoraryShowAmountChange);
    send_input.change();
    
}

function populateAuthnetDescription() {
    var field = $(this);
    var form = field.parents('form.donation-form-authnet-dpm');
    // we could serialize, but then our javascript touches the cc info
    var first_name = form.find("input[name='x_first_name']").val()
    var last_name = form.find("input[name='x_last_name']").val()
    var amount = form.find("input[name='x_amount']").val()
    var description = first_name + ' ' + last_name + ' - $' + amount + ' Donation';
    form.find("input[name='x_description']").val(description);
}

$(document).ready(function () {
    // Setup donation form tabs
    $('.donation-form-wrapper ul.tabs').tabs('.donation-form-wrapper .panels > .panel');
   
    // Setup donation level buttons 
    $('.field-donation-amount .option label').click(function () {
        var radio = $(this).parent().find('input');
        var option = radio.parents('.option');
        var options = option.parents('.options');
        var field = options.parents('.field:first');
        var form = field.parents('form:first');
        var amount_field = form.find('.field-amount input');
        amount_field.val(radio.val());
        options.find('.option').removeClass('selected');
        option.addClass('selected');
        showHideDonationForm(form);
        populateRecurlyQuantity(radio.val());
        updateAuthnetDpmFingerprint(form);
    });

    // Construct Authorize.net transaction description as inputs change
    var authnet_dpm_form = ($('.donation-form-authnet-dpm').length);
    if (authnet_dpm_form.length) {
    }

    $('form.donation-form').each(function () {
        var form = $(this);
        showHideDonationForm(form);
        // If this is not a recurly form (which already handles client side validation), enable jquerytools html5 validation
        if (! form.hasClass('donation-form-recurly')) {
            //form.validator();
        }
    });

    $('.field-donation-amount .field-amount input').change(processNewAmountValue);
    $('.field-donation-amount .field-amount input').keyup(processNewAmountValue);

    //$("form").validationEngine('attach');

    setupAuthnetDpmForm();
    setupHonoraryForm();
});
