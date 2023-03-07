alert(
  "\nActivating Bionic text, REFRESH to revert. \nMade by Hans\n\n(https://hans.pages.dev)"
);

var elementsToBold = $("body")
  .find("*")
  .contents()
  .filter(function () {
    // Only select text nodes that are not inside a script, style, or header tag
    return (
      this.nodeType === 3 &&
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
      if (word.length > 1 && !(word == " ")) {
        var midIndex = Math.floor(word.length / 2);
        var bolded =
          '<time style="font-weight:bold; text-shadow: 1px 0px 0px;">' +
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

setTimeout(loadMore, 50);
console.log(1);
