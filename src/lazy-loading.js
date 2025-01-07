document.addEventListener("DOMContentLoaded", function () {
  var observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        pbjs.requestBids({
          adUnitCodes: ["/19968336/header-bid-tag-1"],
        });
        observer.unobserve(entry.target);
      }
    });
  });

  var adSlot = document.getElementById("div-ad-banner");
  observer.observe(adSlot);
});
