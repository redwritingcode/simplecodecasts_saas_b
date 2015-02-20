// javascript explanation: document.ready is the jquery safeguard. then it grabs the metatag from the Head of the site. user fills out the form, they click the sign up button. Button gets disabled and send card info to Stripe. When stripe completes processing, and sends a response, then StripeResponse handler activates then complete processing in our server See Lecture 143, 10:43

$(document).ready(function() {
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  // Watch for a form submission:
  $("#form-submit-btn").click(function(event) {
    event.preventDefault();
    $('input[type=submit]').prop('disabled', true);
    var error = false;
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();

    if (!error) {
      // Get the Stripe token:
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  }); // form submission
  
  function stripeResponseHandler(status, response) {
    // Get a reference to the form:
    var f = $("#new_user");

    // Get the token from the response:
    var token = response.id;

    // Add the token to the form:
    f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');

    // Submit the form:
    f.get(0).submit(); 
  }
});

