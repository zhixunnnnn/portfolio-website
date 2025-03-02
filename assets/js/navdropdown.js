document.addEventListener("DOMContentLoaded", function () {
  // Step 1: Fade in the body first
  setTimeout(() => {
    document.body.classList.remove("opacity-0");

    // Step 2: After 0.5s, slide down the navbar
    setTimeout(() => {
      document.getElementById("navbar").classList.remove("-translate-y-full");
      document.getElementById("navbar").classList.add("translate-y-0");
    }, 500); // 0.5s delay before navbar appears
  }, 500); // Page fades in after 1s (adjustable)
});

$(document).ready(function () {
  $("#menu-toggle").click(function (event) {
    event.stopPropagation(); // Prevent immediate closing when clicking toggle
    $("#dropdown-menu").toggleClass("opacity-0 scale-95 opacity-100 scale-100");
  });

  // Close menu and uncheck checkbox when clicking outside
  $(document).click(function (event) {
    if (!$(event.target).closest("#menu-toggle, #dropdown-menu").length) {
      $("#dropdown-menu")
        .addClass("opacity-0 scale-95")
        .removeClass("opacity-100 scale-100");
      $("#menu-toggle").prop("checked", false); // Uncheck the checkbox
    }
  });
});
