var pbjs = pbjs || {};
pbjs.onEvent("bidResponse", function (data) {
  console.log("Bid Response:", data);
  // Send analytics data to Google Analytics or a custom endpoint
  var CLIENT_ID = "";
  var payload = {
    client_id: CLIENT_ID, // Replace with your GA Client ID
    events: [
      {
        name: "bid_response",
        params: {
          bidder: data.bidder,
          cpm: data.cpm,
          currency: data.currency,
        },
      },
    ],
  };

  var MEASUREMENT_ID = "G-K43FNNX0BL";
  var API_SECRET = "";
  fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
});

pbjs.onEvent("bidTimeout", function (bidder) {
  console.warn(`Bidder timeout: ${bidder}`);
});
pbjs.onEvent("auctionEnd", function (data) {
  if (!data || !data.bidsReceived) {
    console.error("No valid response received from the server.");
    return;
  }

  data.bidsReceived.forEach((bid) => {
    if (!bid || typeof bid.cpm === "undefined") {
      console.warn("Invalid bid response:", bid);
    }
  });
});
