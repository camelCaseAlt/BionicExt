alert(
  "\nActivating Bionic text, REFRESH to revert. \nMade by Hans\n\n(https://github.com/camelCaseAlt)"
);

function boldTextNodes() {
  var elementsToBold = $("body")
    .find("*")
    .contents()
    .filter(function () {
      // Only select text nodes that are not inside a script, style, or header tag
      return (
        this.nodeType === 3 &&
        this.textContent.trim().length > 0 &&
        !$(this).parent().hasClass("BionicTextActive") &&
        $(this).parent().prop("tagName") !== "SCRIPT" &&
        $(this).parent().prop("tagName") !== "STYLE" &&
        $(this).parent().prop("tagName") !== "IMG" &&
        !$(this).parents("h1, h2, h3, h4, h5, h6").length
      );
    });

  var numElements = elementsToBold.length;
  var elementsLoaded = 0;

  function loadMore() {
    for (var i = 0; i < 100 && elementsLoaded < numElements; i++) {
      var element = elementsToBold[elementsLoaded];
      // Split the text node into words
      var words = element.nodeValue.split(/\b/);

      // Replace each word with a bold version of the first half of the letters
      for (var j = 0; j < words.length; j++) {
        var word = words[j];
        if (word.length > 1) {
          var midIndex = Math.floor(word.length / 1.6);
          var bolded =
            '<time class="BionicTextActive" style="text-shadow: 0 0.015em ,0 -0.045em,0.01em 0 ,-0.04em 0 ;">' +
            word.slice(0, midIndex) +
            "</time>" +
            word.slice(midIndex);
          words[j] = bolded;
        }
      }

      // Replace the text node with the modified version
      $(element).replaceWith(words.join(""));
      elementsLoaded++;
    }

    if (elementsLoaded < numElements) {
      setTimeout(loadMore, 50);
    }
  }

  setTimeout(loadMore, 0);
}

boldTextNodes();

console.log(2);
