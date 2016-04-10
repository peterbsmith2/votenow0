"use strict";
const request = require('request-promise');

// lookup the address for the lat and lng of a location
function lookupAddress(lat, lng) {
  return request({
    method: "GET",
    url: "https://api.geocod.io/v1/reverse",
    qs: {
      q: `${lat},${lng}`,
      api_key: "0986aa769a9a0c42065541c057ca55000c7a400",
    },
  }).then((data) => {
    return JSON.parse(data);
  }).then((json) => {
    if (json.results && json.results.length) {
      let result = json.results[0];
      return {
        number: result.address_components.number,
        street: result.address_components.formatted_street,
        city: result.address_components.city,
        state: result.address_components.state,
        country: result.address_components.country,
        zip: result.address_components.zip,
        county: result.address_components.county,
        location: result.location,
      };
    } else {
      return "bad geoloaction info";
    }
  });
}

// lookup the address for the lat and lng of a location
function lookupAddressViaString(address) {
  return request({
    method: "GET",
    url: "https://api.geocod.io/v1/geocode",
    qs: {
      q: address,
      api_key: "0986aa769a9a0c42065541c057ca55000c7a400",
    },
  }).then((data) => {
    return JSON.parse(data);
  }).then((json) => {
    if (json.results && json.results.length) {
      let result = json.results[0];
      return {
        number: result.address_components.number || 3200,
        street: result.address_components.formatted_street,
        city: result.address_components.city,
        state: result.address_components.state,
        country: result.address_components.country,
        zip: result.address_components.zip,
        county: result.address_components.county,
        location: result.location,
      };
    } else {
      return "bad geoloaction info";
    }
  });
}

function getVotingData(address) {
  if (address.number && address.street && address.zip) {
    console.log(address)
    switch (address.county) {
      // Rochester
      case "Monroe County":
        return request({
          method: "GET",
          url: "https://apis.opensyracuse.org/elections/monroe",
          qs: {
            house_num: address.number,
            street_name: address.street,
            zip: address.zip,
          },
        });

      // Syracuse
      case "Onondaga County":
      default:
        return request({
          method: "POST",
          url: "https://apis.opensyracuse.org/elections/",
          json: {
            house_num: address.number,
            street_name: address.street,
            zip: address.zip,
          },
        });
    }
  } else {
    return {error: "Geolocation didn't work because you didn't give us the right stuff!"};
  }
}

module.exports = {
  lookupAddress,
  lookupAddressViaString,
  getVotingData,
};
