var lazyLoader = function () {
  $("body")
    .find("*")
    .contents()
    .filter(function () {
      // Only select text nodes that are not inside a script, style, or header tag
      return (
        this.nodeType === 3 &&
        $(this).parent().prop("tagName") !== "SCRIPT" &&
        $(this).parent().prop("tagName") !== "STYLE" &&
        !$(this).parents("h1, h2, h3, h4, h5, h6").length
      );
    })
    .each(function () {
      // Split the text node into words
      var words = this.nodeValue.split(/\b/);

      // Replace each word with a span containing a bold version of half of the letters
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word.length > 1) {
          var midIndex = Math.floor(word.length / 2);
          var span =
            '<span style="text-shadow: 1px 0px 0px;">' +
            word.slice(0, midIndex) +
            "</span>" +
            word.slice(midIndex);
          words[i] = span;
        }
      }

      // Replace the text node with the modified version
      $(this).replaceWith(words.join(""));
    });
};

// Load all text initially
lazyLoader();

// Set up a scroll event listener to lazy load text as the user scrolls
$(window).scroll(function () {
  // Check if the user has scrolled to the bottom of the page
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    // Lazy load text
    lazyLoader();
  }
});

// $(document).ready(function () {
//   $("body")
//     .find("*")
//     .each(function () {
//       var words = $(this)
//         .contents()
//         .filter(function () {
//           return this.nodeType === 3 && this.textContent.trim().length > 0;
//         });
//       words.each(function () {
//         if ($(this).parent().is(":visible")) {
//           var text = $(this).text();
//           var bolded = text.slice(0, Math.ceil(text.length / 2));
//           var normal = text.slice(Math.ceil(text.length / 2), text.length);
//           var newHtml = "<strong>" + bolded + "</strong>" + normal;
//           $(this).replaceWith(newHtml);
//         }
//       });
//     });
// });
