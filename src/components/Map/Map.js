import React from "react";
import GoogleMapReact from "google-map-react";
import MapPin from "./MapPin";

const API_KEY = process.env.REACT_APP_API_KEY;

function Map({ chosenLocation, listings, timeDelta }) {
  const zoomLevel = 10;
  console.log(`chosen location`);
  console.log(chosenLocation);
  console.log("listings");
  console.log(listings);

  function mouseHover(e) {
    e.target.style.background = "red";
  }

  function mouseLeave(e) {
    e.target.style.background = "white";
  }

  function getPrice(chosenSpot) {
    let days = timeDelta / 1000 / 60 / 60 / 24;
    console.log(`days: ${days}`);

    if (days <= 1) {
      console.log(`this happens`);
      let hours = timeDelta / 1000 / 60 / 60;
      let price = hours * chosenSpot.prices.hourly;
      if (price > chosenSpot.prices.daily_max) {
        console.log("returning this... ", chosenSpot.prices.daily_max);
        return chosenSpot.prices.daily_max;
      } else {
        return price;
      }
    }

    let monthly = Math.floor(days / 30);
    console.log(`monthly: ${monthly}`);
    let monthlyRemainder = days % 30;
    console.log(`mrem: ${monthlyRemainder}`);

    let weekly = Math.floor(monthlyRemainder / 7);
    console.log(`weekly: ${weekly}`);
    let weeklyRemainder = weekly % 7;
    console.log(`weeklyrem: ${weeklyRemainder}`);

    let daily = Math.floor(weeklyRemainder);
    console.log(`daily: ${daily}`);

    console.log(`chosenSpot`);
    console.log(chosenSpot);

    let price =
      monthly * chosenSpot.prices.monthly +
      weekly * chosenSpot.prices.weekly +
      daily * chosenSpot.prices.daily_max;

    console.log(`price: ${price}`);

    return price;
  }

  function renderPin(spot, price) {
    return (
      <MapPin
        key={spot.spotId}
        lat={spot.l[0]}
        lng={spot.l[1]}
        text={spot.spot_name}
        mouseHover={mouseHover}
        mouseLeave={mouseLeave}
        spotInfo={spot}
        price={price}
      ></MapPin>
    );
  }
  function renderListingPins(listings) {
    let renderedPins = [];
    for (const spot of listings) {
      let price = getPrice(spot);
      renderedPins.push(renderPin(spot, price));
    }
    return renderedPins;
  }
  console.log(`this many listings!!! ${listings.length}`);
  if (!listings.length) {
    return (
      <div id="mainMap">
        <GoogleMapReact
          resetBoundsOnResize={true}
          bootstrapURLKeys={{ key: API_KEY }}
          center={chosenLocation}
          defaultZoom={zoomLevel}
          style={{
            width: "100%",
            height: "calc(100vh - 150px)",
          }}
        ></GoogleMapReact>
      </div>
    );
  } else {
    return (
      <div id="mainMap">
        <GoogleMapReact
          resetBoundsOnResize={true}
          bootstrapURLKeys={{ key: API_KEY }}
          center={chosenLocation}
          defaultZoom={zoomLevel}
          style={{
            width: "100%",
            height: "calc(100vh - 150px)",
          }}
        >
          {renderListingPins(listings)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
