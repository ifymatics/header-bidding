var googletag = googletag || {};
var pbjs = pbjs || {};
googletag.cmd = googletag.cmd || [];

pbjs.que = pbjs.que || [];
pbjs.que.push(function () {
  pbjs.addAdUnits(adUnits);

  pbjs.requestBids({
    bidsBackHandler: function () {
      var allBids = pbjs.getBidResponses();
      console.log("All bid responses:", allBids);

      if (Object.keys(allBids).length === 0) {
        console.error("No bid responses received.");
        googletag.pubads().refresh();
        return;
      }

      Object.keys(allBids).forEach((adUnitCode) => {
        var validBids = allBids[adUnitCode].bids.filter((bid) =>
          validateBid(bid, adUnits)
        );

        if (validBids.length === 0) {
          console.warn(`No valid bids for ad unit ${adUnitCode}`);
        } else {
          console.log(`Valid bids for ${adUnitCode}:`, validBids);
        }
      });

      pbjs.setTargetingForGPTAsync();
      googletag.cmd.push(function () {
        googletag.pubads().refresh();
      });
    },
  });

  //Enabling google analytics for tracking
  pbjs.enableAnalytics([
    {
      provider: "ga" ? "ga" : "",
      options: {
        sampling: 0.1,
        cpmDistribution: function (cpm) {
          return cpm <= 1 ? "<= 1$" : "> 1$";
        },
        global: "ga" ? "ga" : "", // Reference to the GA tracking function
        enableDistribution: true, // Enables latency tracking
      },
    },
  ]);
});

googletag.cmd.push(function () {
  googletag
    .defineSlot("/19968336/header-bid-tag-1", [[728, 90]], "div-ad-banner")
    .addService(googletag.pubads());
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});

pbjs.que.push(function () {
  pbjs.addAdUnits(adUnits);

  pbjs.requestBids({
    bidsBackHandler: function () {
      var allBids = pbjs.getBidResponses();
      console.log("All bid responses:", allBids);

      if (Object.keys(allBids).length === 0) {
        console.error("No bid responses received.");
        googletag.pubads().refresh();
        return;
      }

      Object.keys(allBids).forEach((adUnitCode) => {
        var validBids = allBids[adUnitCode].bids.filter((bid) =>
          validateBid(bid, adUnits)
        );

        if (validBids.length === 0) {
          console.warn(`No valid bids for ad unit ${adUnitCode}`);
        } else {
          console.log(`Valid bids for ${adUnitCode}:`, validBids);
        }
      });

      pbjs.setTargetingForGPTAsync();
      googletag.cmd.push(function () {
        googletag.pubads().refresh();
      });
    },
  });
});
