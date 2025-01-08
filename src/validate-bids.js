function validateBid(bid, adUnits) {
  var requiredFields = ["price", "adomain", "width", "height", "crid", "cid"];
  var prohibitedAdvertisers = ["blocked-advertiser.com"]; // Example blocked domains
  var prohibitedAttributes = [6, 7]; // Example blocked creative attributes (e.g., autoplay video, popups)

  // Check for missing required fields
  for (var field of requiredFields) {
    if (!bid[field]) {
      console.warn(`Bid missing required field: ${field}`);
      return false;
    }
  }

  // Validate bid price
  if (bid.price <= 0) {
    console.warn(`Invalid bid price: ${bid.price}`);
    return false;
  }

  // Validate advertiser domain
  if (!Array.isArray(bid.adomain) || bid.adomain.length === 0) {
    console.warn("Missing or invalid advertiser domain");
    return false;
  }
  if (bid.adomain.some((domain) => prohibitedAdvertisers.includes(domain))) {
    console.warn(`Bid from prohibited advertiser: ${bid.adomain}`);
    return false;
  }

  // Validate creative compatibility (size matching)
  const adUnit = adUnits.find((unit) => unit.code === bid.adUnitCode);
  if (!adUnit) {
    console.warn(`Ad unit not found for bid: ${bid.adUnitCode}`);
    return false;
  }
  const validSizes = adUnit.mediaTypes.banner.sizes;
  if (
    !validSizes.some((size) => size[0] === bid.width && size[1] === bid.height)
  ) {
    console.warn(
      `Creative size mismatch: ${bid.width}x${bid.height} for ad unit ${bid.adUnitCode}`
    );
    return false;
  }

  // Check for prohibited creative attributes
  if (
    Array.isArray(bid.attr) &&
    bid.attr.some((attr) => prohibitedAttributes.includes(attr))
  ) {
    console.warn(`Bid contains prohibited attributes: ${bid.attr}`);
    return false;
  }

  // Optional: Check content categories if defined
  if (
    Array.isArray(bid.cat) &&
    bid.cat.some((category) => prohibitedCategories.includes(category))
  ) {
    console.warn(`Bid contains prohibited content category: ${bid.cat}`);
    return false;
  }

  // Optional: Validate deal ID for private marketplace (PMP) bids
  if (bid.dealid && typeof bid.dealid !== "string") {
    console.warn(`Invalid deal ID: ${bid.dealid}`);
    return false;
  }

  // Optional: Validate OpenRTB extensions
  if (bid.ext && typeof bid.ext !== "object") {
    console.warn(`Invalid bid extension object: ${JSON.stringify(bid.ext)}`);
    return false;
  }

  // All checks passed
  return true;
}
