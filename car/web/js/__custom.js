require(['jquery', 'jquery/ui'], function($){ 

  jQuery(".customer-logged-in a.merchant_dashboard").parent().css({"display": "none"});


  // Mobile Landscape Warning
  jQuery(window).on('resize orientation', function() {
    sw = jQuery(window).width();
    sh = jQuery(window).height();
    if (sh < 450 && sw > 480 && sw < 820) {
        jQuery('#portrait-warnning').css('display', 'flex');
    } else {
        jQuery('#portrait-warnning').css('display', 'none');
    }
  });

  // Print Link on Compare Page
  jQuery('.action.print:first').addClass('print-link');

  jQuery(document).ready(function(){

    jQuery(".block.filter").addClass("fix-filter");

    // setTimeout(function() {
      if ($(document).find('div').hasClass('fab-product-listing')) {

        // document.addEventListener('DOMContentLoaded', function() {
          // When the event DOMContentLoaded occurs, it is safe to access the DOM
        
          // When the user scrolls the page, execute myFunction 
          window.addEventListener('scroll', myFunctionForSticky);
        
          // Get the navbar
          var navbar = document.getElementsByClassName("fix-filter")[0];
        
          // Get the offset position of the navbar
          var sticky = navbar.offsetTop;
        
          function myFunctionForSticky() {
            if (sticky >= window.pageYOffset) {
              // console.log("Not window.pageYOffset >= sticky");
              navbar.classList.remove("sticky-filter");
            } else {
              // console.log("window.pageYOffset >= sticky");
              navbar.classList.add("sticky-filter");
            }
          }

        // })
      
      }
    
    // }, 2000);

    
  // Addiing Wrapper in Success Page
  jQuery(".success-center-banner").parent().addClass('success-banner-wrapper');
  jQuery('.checkout-success,.success-banner-wrapper').wrapAll('<div class="thankyou-wrapper"></div>');
  
  // Addiing Class on Widget Div in Success Page
    jQuery(".best-selling").parent().addClass('selling-wrapper');
  });


  // Adding  Recaptcha Placeholder
  function placeholders() {
    document.querySelector("input[type=text][id=captcha_user_forgotpassword]")
    .setAttribute("placeholder", "Enter Captcha");
  }
  jQuery(document).ready(function () {
      var pathname =window.location.pathname;
      console.log(pathname);
          if ( pathname== '/marketplace/' || pathname=='/customer/account/login/' || pathname=='/customer/account/create/' || pathname=='/customer/account/create/v/1/'  ) {
              placeholders()
          }
      }


  );

  
});