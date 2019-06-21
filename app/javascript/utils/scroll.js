export const scrollToEl = function (elSelector, offsetSelector, addlOffset) {
  let scrollTo = $(elSelector).offset().top
  if (offsetSelector) {
    scrollTo = scrollTo - $(offsetSelector).offset().top
  }
  if (addlOffset) {
    scrollTo = scrollTo - addlOffset
  }

  $('html, body').animate({
    scrollTop: scrollTo
  }, 2000)
}
