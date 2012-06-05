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
    options.find('.option').removeClass('selected');
    option = options.find('input[value="' + $(this).val() + '"]');
    option.parent('.option').addClass('selected');
    showHideDonationForm(option.parents('form'));
    populateRecurlyQuantity($(this).val());
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
}

$(document).ready(function () {
    // Setup donation form tabs
    $('.donation-form-wrapper ul.tabs').tabs('.donation-form-wrapper .panels > .panel');
    
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
    });
    $('.field-donation-amount .field-amount input').change(processNewAmountValue);
    $('.field-donation-amount .field-amount input').keyup(processNewAmountValue);

    //$("form").validationEngine('attach');
});
