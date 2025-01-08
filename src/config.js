// Define ad units
var adUnits = [
  {
    code: "/19968336/header-bid-tag-1",
    mediaTypes: {
      banner: {
        sizes: window.innerWidth < 768 ? [[300, 250]] : [[728, 90]],
      },
    },
    bids: [
      { bidder: "appnexus", params: { placementId: "13144370" } },
      {
        bidder: "rubicon",
        params: { accountId: "7780", siteId: "87184", zoneId: "413290" },
      },
    ],
    labels: ["desktop", "mobile"],
  },
];

// Function to get floor prices
function getFloorPrice(adSize, deviceType) {
  if (deviceType === "mobile") return adSize[0] === 300 ? 0.5 : 1.0;
  return adSize[0] === 728 ? 1.5 : 2.0;
}

// Set Prebid.js configuration
var pbjs = pbjs || {};

pbjs.setConfig({
  priceGranularity: "high",
  enableTIDs: {
    default: false,
    bidders: {
      rubicon: true,
    },
  },
  bidderSettings: {
    appnexus: {
      storageAllowed: true,
    },
    rubicon: {
      storageAllowed: true,
    },
  },
  floors: {
    rules: [
      {
        mediaType: "banner",
        sizes: [
          [300, 250],
          [728, 90],
        ],
        floorMin: getFloorPrice([728, 90], "desktop"),
      },
    ],
  },
});
