var pbjs = pbjs || {};
// Initialize counters for win rate calculation
let totalBids = 0;
let winningBids = 0;

pbjs.onEvent("bidResponse", function (bid) {
  console.log("Bid Response:", bid);

  // Increment total bids count
  totalBids++;

  // Extract relevant bid data
  const bidData = {
    bidder: bid.bidder, // SSP/Demand Partner
    adUnitCode: bid.adUnitCode, // Ad Unit Identifier
    cpm: bid.cpm, // Bid CPM value
    latency: bid.timeToRespond, // Time taken for the bid response
  };

  console.log("Tracked Bid Data:", bidData);

  // Send analytics for bids
  gtag("send", "event", "Prebid.js", "Bid Response", {
    dimension1: bidData.bidder, // Custom dimension for bidder
    dimension2: bidData.adUnitCode, // Custom dimension for ad unit
    metric1: bidData.cpm, // Custom metric for CPM
    metric2: bidData.latency, // Custom metric for latency
  });
});

// Track winning bids
pbjs.onEvent("bidWon", function (bid) {
  console.log("Winning Bid:", bid);

  // Increment winning bids count
  winningBids++;

  // Calculate win rate
  const winRate = (winningBids / totalBids) * 100;

  // Extract relevant win data
  const winData = {
    bidder: bid.bidder, // SSP/Demand Partner
    adUnitCode: bid.adUnitCode, // Ad Unit Identifier
    cpm: bid.cpm, // Winning bid CPM
    latency: bid.timeToRespond, // Time taken for the winning bid
    winRate: winRate.toFixed(2), // Win rate percentage
  };

  console.log("Tracked Winning Bid Data:", winData);

  // Send analytics for winning bids
  gtag("send", "event", "Prebid.js", "Bid Won", {
    dimension1: winData.bidder, // Custom dimension for bidder
    dimension2: winData.adUnitCode, // Custom dimension for ad unit
    metric1: winData.cpm, // Custom metric for CPM
    metric2: winData.latency, // Custom metric for latency
    metric3: winData.winRate, // Custom metric for win rate (optional)
  });
});

// Track latency metrics at the end of each auction
pbjs.onEvent("auctionEnd", function (auction) {
  console.log("Auction Ended:", auction);

  // Collect and log latency data for all bids in the auction
  auction.bidsReceived.forEach((bid) => {
    const latencyData = {
      bidder: bid.bidder, // SSP/Demand Partner
      adUnitCode: bid.adUnitCode, // Ad Unit Identifier
      latency: bid.timeToRespond, // Time taken for the bid response
    };

    console.log("Tracked Latency Data:", latencyData);

    // Send analytics for bid latency
    gtag("send", "event", "Prebid.js", "Bid Latency", {
      dimension1: latencyData.bidder, // Custom dimension for bidder
      dimension2: latencyData.adUnitCode, // Custom dimension for ad unit
      metric1: latencyData.latency, // Custom metric for latency
    });
  });

  console.log(
    `Auction Completed: Total Bids = ${totalBids}, Winning Bids = ${winningBids}`
  );
});
