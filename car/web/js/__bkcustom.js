document.addEventListener('DOMContentLoaded', function() {
  // When the event DOMContentLoaded occurs, it is safe to access the DOM

  // When the user scrolls the page, execute myFunction 
  window.addEventListener('scroll', myFunctionForSticky);

  // Get the navbar
  var navbar = document.getElementById("layered-filter-block");
  // var myfilter = document.getElementsByClassName("filter-options-item");

  // Get the offset position of the navbar
  var sticky = navbar.offsetTop;
  // Add the sticky class to the navbar when you reach its scroll position. 
  // Remove "sticky" when you leave the scroll position

  function myFunctionForSticky() {
    if (sticky >= window.pageYOffset) {
      console.log("Not window.pageYOffset >= sticky");
      navbar.classList.remove("sticky-filter");
    } else {
      console.log("window.pageYOffset >= sticky");
      navbar.classList.add("sticky-filter");
    }
  }
})


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


  // jQuery('#wishlistOnTop').hide(0).delay(5000).show(0);

  // Print Link on Compare Page
  jQuery('.action.print:first').addClass('print-link');
});