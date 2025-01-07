window.addEventListener("load", function () {
  setTimeout(() => {
    var pbjs = pbjs || {};
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    if (!pbjs.adServerRequestSent) {
      console.error("No bids received, loading fallback ad.");
      googletag.cmd.push(() => googletag.pubads().refresh());
    }
  }, 3000); // Wait for bids
});
