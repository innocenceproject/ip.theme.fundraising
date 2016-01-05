(function($) { $(function() {
    
    // Display credit card warning
    $('.form-buttons.after-amount').append("<p>Your card will be charged<br /><span class='noback'>Please do not hit the back button after clicking submit</span></p>");

    // Add warning about back button
    $(".form-buttons input[value='Submit']").mouseenter(function() {
        $(".noback").fadeIn('slow');
    });
    
}); })(jQuery);
