function form_input_is_int(input){
  return !isNaN(input)&&parseInt(input)==input;
}

// Donation form logic
function showHideDonationForm(form) {
    var min_value = 5;
    if (form.hasClass('donation-form-product') == true) {
        min_value = 1;
    }
    if (form.find('.field-amount input').val() >= min_value) {
        form.parents('div.panel').find('.after-amount').slideDown();
    } else {
        form.parents('div.panel').find('.after-amount').slideUp();
    }
}

function processNewAmountValue() {
    var options = $(this).parents('.field').find('.options');
    var form = options.parents('form');

    if (form.hasClass('donation-form-product') == true) {
        updateDonationProductTotal(form);
    }

    options.find('.option').removeClass('selected');
    var option = options.find('input[value="' + $(this).val() + '"]');
    option.parent('.option').addClass('selected');

    showHideDonationForm(form)

    // Recurly integration
    populateRecurlyQuantity($(this).val());

    // Authorize.net DPM integration
    updateAuthnetDpmFingerprint(form);

}

function updateDonationProductTotal(form) {
    var quantity = form.find('input[name="c_quantity"]').val();
    var price = form.find('.product-price .value').text();
    var total = quantity * price;
    form.find('input[name="x_amount"]').val(total);
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
    var forms = $('form.donation-form-authnet-dpm');
    forms.each(function () {
        var form = $(this);
        if (form.length == 0) {
            return;
        }
    
        // Turn off AJAX request caching to ensure a stale fingerprint doesn't get cached
        $.ajaxSetup({ cache: false });
    
        // Concatenate expiration month/year
        var exp_month = form.find('select.card-expiration-month');
        var exp_year = form.find('select.card-expiration-year');
        var exp_full = form.find('input[name="x_exp_date"]');
        exp_full.val(exp_month.val() + exp_year.val());
        exp_month.change(function () {
            exp_full.val(exp_month.val() + exp_year.val());
        })
        exp_year.change(function () {
            exp_full.val(exp_month.val() + exp_year.val());
        })
    
        // Setup populate of Authorize.net transaction description field
        var first_name = form.find("input[name='x_first_name']").change(populateAuthnetDescription);
        var last_name = form.find("input[name='x_last_name']").change(populateAuthnetDescription);
        var amount = form.find("input[name='x_amount']").change(populateAuthnetDescription);
        var description = form.find("input[name='x_description']").change(populateAuthnetDescription);
    
        // Require integer in account field
        amount.change(function () {
            if (form_input_is_int($(this).val()) == false) {
                alert('Please enter a whole number for the Amount');
            }
        });
    
        // Setup the authnet dpm fingerprint to refresh every 10 minutes
        var fingerprintRefresh = setInterval(function () {
            updateAuthnetDpmFingerprint(form);
        }, 600000);
    });
}

function handleHonoraryTypeChange() {
    var form = $(this).parents('form.donation-form-honorary');
    if ($(this).attr('checked') == true) {
        var honorary_name = form.find('.field-honorary-name')
        var honorary_name_label = honorary_name.find('label')
        if ($(this).val() == 'Memorial') {
            honorary_name_label.text(honorary_name_label.text().replace('honor','memory'));
            form.find('.field.honorary-recipient').show();
        }
        if ($(this).val() == 'Honorary') {
            honorary_name_label.text(honorary_name_label.text().replace('memory','honor'));
            form.find('.field.honorary-recipient').hide();
        }
        honorary_name.slideDown();
        form.find('.field-honorary-send, .fieldset-notification').slideDown();
        form.find('.fieldset-preview').slideDown();
        
        form.find('.form-buttons').slideDown();
    }
    refreshHonoraryPreview(form);
}

function handleHonoraryNotificationChange() {
    var form = $(this).parents('form.donation-form-honorary');

    if ($(this).attr('checked') == true) {
        var recipient = form.find('.field-recipient');
        var email = form.find('.field-email');
        var address = form.find('.field-address');
        var message = form.find('.fieldset-message');
        var preview = form.find('.fieldset-preview');

        message.find('.field').show();

        if ($(this).val() == 'Email') {
            recipient.show();
            email.show();
            address.hide();
            recipient.find('input[name]').attr('required','required');
            email.find('input[name]').attr('required', 'required');
            address.find('input[name], select[name]').removeAttr('required');
            message.show();
            preview.show();
            //return false;
        } 
        if ($(this).val() == 'Mail') {
            recipient.show();
            email.hide();
            address.show();
            recipient.find('input[name]').attr('required','required');
            email.find('input[name]').removeAttr('required');
            address.find('input[name], select[name]').attr('required', 'required');
            message.show();
            preview.show();
            //return false;
        } 
        if ($(this).val() == 'None' || $(this).val() == '') {
            recipient.hide();
            message.hide();
            email.hide();
            address.hide();
            recipient.find('input[name]').removeAttr('required');
            email.find('input[name]').removeAttr('required');
            address.find('input[name], select[name]').removeAttr('required');
            preview.hide();
        }

        refreshHonoraryPreview(form);
    }
}

function handleHonoraryShowAmountChange() {
    var form = $(this).parents('form.donation-form-honorary');
    refreshHonoraryPreview(form);
}

function refreshHonoraryPreview(form) {
    var preview_fieldset = form.find('.fieldset-preview');
    var honorary_notification_type = form.find('input[name="honorary_notification_type"]:checked').val();

    if (honorary_notification_type == 'None' || honorary_notification_type == '') {
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

    if (preview_href == '') {
        return false;
    }

    preview_fieldset.find('.field-preview').load(preview_href, function () {$(this).slideDown()});
}

function linkStateAndCountryField() {
    var value = $(this).val();
    var field = $(this).parents('.field');
    var state_select = field.find('.subfield-state select');
    var state_input = field.find('.subfield-state input');
    var state_field_name = state_select.attr('name');
    if (state_field_name == '') {
        state_field_name = state_input.attr('name');
    }

    if (value == 'US') {
        state_select.attr('name', state_field_name).attr('required', 'required').show();
        state_input.attr('name', '').removeAttr('required').hide();
    } else {
        state_select.attr('name', '').removeAttr('required').hide();
        state_input.attr('name', state_field_name).show();
    }
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
    send_input.change(handleHonoraryNotificationChange);
    send_input.change();
    
    // Handle changes in show_amount
    var send_input = form.find('.subfield-show-amount .option input');
    send_input.change(handleHonoraryShowAmountChange);
    send_input.change();
    
}

function populateAuthnetDescription() {
    var field = $(this);
    var form = field.parents('form.donation-form-authnet-dpm');
    var amount_txt = form.find("input[name='x_amount']").val()

    // If this is a product, put the product and quantity name in amount_txt instead of amount
    if (form.hasClass('donation-form-product') == true) {
        var product_name = form.find('.field-amount .product-name').text();
        var quantity = form.find("input[name='c_quantity']").val();
        amount_txt = quantity + ' ' + product_name;
    }

    // we could serialize, but then our javascript touches the cc info
    var first_name = form.find("input[name='x_first_name']").val()
    var last_name = form.find("input[name='x_last_name']").val()
    var description = first_name + ' ' + last_name + ' - $' + amount_txt + ' Donation';
    form.find("input[name='x_description']").val(description);
}

function stripPlaceholderValues() {
    // If value = placeholder, remove value on submit
    $(this).find('input[type=text], input[type=email]').each(function () {
        if ($(this).attr('placeholder') && $(this).val() == $(this).attr('placeholder')) {
            //alert('removing value ' + $(this).val() + ' as placeholder ' + $(this).attr('placeholder'));
            $(this).val('');
        }    
    });
}

/* calculate error message position relative to the input */    
// Pulled directly from jquerytools for use in custom effect below
function getPosition(trigger, el, conf) {
    
    // Get the first element in the selector set
    el = $(el).first() || el;
    
    // get origin top/left position 
    var top = trigger.offset().top,
        left = trigger.offset().left,
        pos = conf.position.split(/,?\s+/),
        y = pos[0],
        x = pos[1];
    
    top  -= el.outerHeight() - conf.offset[0];
    left += trigger.outerWidth() + conf.offset[1];
    
    
    // iPad position fix
    if (/iPad/i.test(navigator.userAgent)) {
        top -= $(window).scrollTop();
    }
    
    // adjust Y     
    var height = el.outerHeight() + trigger.outerHeight();
    if (y == 'center')  { top += height / 2; }
    if (y == 'bottom')  { top += height; }
    
    // adjust X
    var width = trigger.outerWidth();
    if (x == 'center')  { left -= (width  + el.outerWidth()) / 2; }
    if (x == 'left')    { left -= width; }   
    
    return {top: top, left: left};
}


$(document).ready(function () {
    // HTML5 placeholder attribute processing in non-HTML5 browsers
    function placeholder(){
        $("form.donation-form input[type=text], form.donation-form input[type=email]").each(function(){
            var phvalue = $(this).attr("placeholder");
            if ($(this).val() == '') {
                $(this).val(phvalue);
                $(this).addClass('placeholder');
            }
        });
    }
    placeholder();
    $("form.donation-form input[type=text], form.donation-form input[type=email]").focusin(function(){
        var phvalue = $(this).attr("placeholder");
        if (phvalue == $(this).val()) {
            $(this).val("");
            $(this).removeClass('placeholder');
        }
    });
    $("form.donation-form input[type=text], form.donation-form input[type=email]").focusout(function(){
        var phvalue = $(this).attr("placeholder");
        if ($(this).val() == "") {
            $(this).val(phvalue);
            $(this).addClass('placeholder');
        }
    });
    $("form.donation-form input[type=text], form.donation-form input[type=email]").keyup(function(){
        if ($(this).val() != '') {
            $(this).removeClass('placeholder');
        }
    });
    
    // adds an effect called "scrolltofield" to the validator
    $.tools.validator.addEffect("scrolltofield", function(errs, event) {
        var conf = this.getConf();

        // loop errors
        $.each(errs, function(i, err) {
    
            // add error class  
            var input = err.input;                  
            input.addClass(conf.errorClass);
            
            // If single error is enabled, focus on the input
            if (conf.singleError == true) {
                var buttons = input.parents('form').find('.form-buttons');
                buttons.find('.field-error-message').remove();
                buttons.append('<div class="field-error-message"><p>Please fix the errors shown above</p></div>');
                setInterval(function () {
                    buttons.find('.field-error-message').slideUp().remove();
                }, 5000);
                if ($.browser.msie != true) {
                    var container = $('body');
                    container.scrollTop(input.offset().top - container.offset().top);
                }
            }
                
            // get handle to the error container
            var msg = input.data("msg.el"); 
            
            // create it if not present
            if (!msg) { 
                msg = $(conf.message).addClass(conf.messageClass).appendTo(document.body);
                input.data("msg.el", msg);
            }  
            
            // clear the container 
            msg.css({visibility: 'hidden'}).find("p").remove();
            
            // populate messages
            $.each(err.messages, function(i, m) { 
                $("<p/>").html(m).appendTo(msg);            
            });
            
            // make sure the width is not full body width so it can be positioned correctly
            if (msg.outerWidth() == msg.parent().width()) {
                msg.add(msg.find("p")).css({display: 'inline'});        
            } 
            
            // insert into correct position (relative to the field)
            var pos = getPosition(input, msg, conf); 
             
            msg.css({ visibility: 'visible', position: 'absolute', top: pos.top, left: pos.left })
                .fadeIn(conf.speed);     

            if (conf.singleError == true) {
                return false;
            }
        });
    }, function (inputs) {});
 
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

        // If this is a donation product form, swap quantity field for amount field
        if (form.hasClass('donation-form-product') == true) {
            amount_field = form.find('.field-quantity input');
        }

        amount_field.val(radio.val());
        options.find('.option').removeClass('selected');
        option.addClass('selected');
        showHideDonationForm(form);
        populateRecurlyQuantity(radio.val());

        if (form.hasClass('donation-form-product') == true) {
            updateDonationProductTotal(form);
        }

        updateAuthnetDpmFingerprint(form);

    });

    // Construct Authorize.net transaction description as inputs change
    var authnet_dpm_form = ($('.donation-form-authnet-dpm').length);
    if (authnet_dpm_form.length) {
    }

    $('form.donation-form').each(function () {
        var form = $(this);
        showHideDonationForm(form);
        // If this is not a recurly form (which already handles client side validation), enable validation
        if (! form.hasClass('donation-form-recurly')) {
            // Strip placeholder values
            form.submit(stripPlaceholderValues);

            // Set validator
            //form.attr('novalidate','novalidate').validator({effect: 'scrolltofield', singleError: true, position: 'bottom left', messageClass: 'field-error-message', onFail: function (e, els) {placeholder();}});
            form.attr('novalidate','novalidate').validator({effect: 'scrolltofield', singleError: true, position: 'bottom left', messageClass: 'field-error-message', onFail: function (e, els) {placeholder();}});
        }
    });

    $('.field-donation-amount .field-amount').each(function () {
        var input = $(this).find('input');
        if ($(this).parents('form.donation-form-product').length > 0) {
            // Bind to the quantity field for a product
            input = $(this).find('.field-quantity input');
        }
        input.change(processNewAmountValue);
        input.keyup(processNewAmountValue);
    });

    //$("form").validationEngine('attach');

    setupAuthnetDpmForm();
    setupHonoraryForm();

    


    // Handle Fundraising Seal More Info link
    $('.fundraising-seal a').click(function () {
        var seal = $(this).parents('.fundraising-seal');
        seal.toggleClass('expanded');
        seal.find('.more-info').slideToggle();
        return false;
    });

    // Setup State/Country field linkage
    $('.subfield-country').change(linkStateAndCountryField);

    // Show loading indicator after form button clicked and make validator play nicely with double submission logic
    $('.form-buttons input').click(function () {
        // Remove the placeholder values before validating to avoid thinking the placeholder fulfills a field's requirements
        $(this).parents('form.donation-form').each(stripPlaceholderValues);
        if ($(this).parents('form.donation-form').data('validator').checkValidity() == true) {
            if ($(this).hasClass('submitted') == true) {
                return false;
            }
            $(this).next('.button-loading-indicator').show();
            $(this).addClass('submitted');
        } else {
            placeholder();
        }
    });

    // If there was a donation form error on the page, select the tab with an error
    $('.donation-form-error').each(function () {
        var tab_index = $(this).parents('.panel').prevAll().length; 
        $(this).parents('.donation-form-wrapper').find('.tabs').data('tabs').click(tab_index); 
    });

    
});
