import React from "react";

function MapPin({ spotInfo, price }) {
  // const [hovered, setHovered] = useState(false);

  function mouseHover(e) {
    // setHovered(true);
    e.target.style.background = "lightgreen";
    e.target.style.color = "black";
    console.log(`searching for id spotListing${spotInfo.spotId}`);
    let listingElement = document.getElementById(
      `spotListing${spotInfo.spotId}`
    );
    listingElement.style.backgroundColor = "lightblue";
  }

  function mouseLeave(e) {
    // setHovered(false);
    e.target.style.background = "#4a8f88";
    e.target.style.color = "white";
    let listingElement = document.getElementById(
      `spotListing${spotInfo.spotId}`
    );
    listingElement.style.backgroundColor = "white";
  }

  const number = Number.parseFloat(price).toPrecision(3)
  const first = number.substring(0, 2)
  const last = number.substring(2, 5)

  return (
    <div
      onClick={() => {
        let listingElement = document.getElementById(
          `spotListing${spotInfo.spotId}`
        );
        let buttonElement = listingElement.querySelector("button");
        // buttonElement.click();
        // console.log("user clicked spot on map");
        // console.log(spotInfo);
      }}
      onMouseEnter={mouseHover}
      onMouseOut={mouseLeave}
      style={{
        width: 40,
        borderRadius: 3,
        padding: 6,
        border: '1px solid gray',
        borderLeft: '5px solid #ee675c',
        cursor: 'pointer',
        fontWeight: '500',
        background: '#fff'
      }}
    >
      <span style={{fontSize: 14, fontFamily: '600'}}>${first}</span>
      {last}
    </div>
  );
}

export default MapPin;
