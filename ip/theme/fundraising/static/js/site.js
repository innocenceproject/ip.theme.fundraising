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
function showHideDonationForm() {
    if ($('#field-amount input').val() >= 5) {
        $('.after-amount').slideDown();
    } else {
        $('.after-amount').slideUp();
    }
}

function processNewAmountValue() {
    var options = $(this).parents('.field').find('.options');
    options.find('.option').removeClass('selected');
    option = options.find('input[value="' + $(this).val() + '"]');
    option.parent('.option').addClass('selected');
    showHideDonationForm();
}

$(document).ready(function () {
    $('#field-donation-amount .option input').click(function () {
        var radio = $(this);
        var option = radio.parents('.option');
        var options = option.parents('.options');
        var field = options.parents('.field');
        var amount_field = field.find('#field-amount input');
        amount_field.val(radio.val());
        options.find('.option').removeClass('selected');
        option.addClass('selected');
        showHideDonationForm();
    });
    $('#field-donation-amount #field-amount input').change(processNewAmountValue);
    $('#field-donation-amount #field-amount input').keyup(processNewAmountValue);

    $("form").validationEngine('attach');
});
