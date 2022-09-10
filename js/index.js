let inputDiv = document.getElementById("input");
let middleDiv = document.querySelector(".middle-div");
let lowerDiv = document.querySelector(".lower-div");

document.querySelector(".arrow-div").addEventListener("click", () => {
  loadRequest(inputDiv.value);
});

const loadMap = (data) => {
  // First we’ll initialize the map and set its view to our chosen geographical coordinates and a zoom level
  let map = L.map("map").setView([data.location.lat, data.location.lng], 13);
  // Next, we’ll add a tile layer to add to our map
  L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
};

const loadRequest = (url) => {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_U0kftmZO8XpXgcGpZwtYLJxDbEvkr&ipAddress=${url}`
  )
    .then((res) => res.json())
    .then((data) => {
      displayInfo(data);
      loadMap(data);
    });
};

const displayInfo = (obj) => {
  middleDiv.innerHTML = `
          <div class="ip-address">
            <span>IP Address</span>
            <span class="ip-address-result">${obj.ip}</span>
          </div>
          <div class="location">
            <span>Location</span>
            <span class="location-result">${obj.location.region}, ${obj.location.country} ${obj.location.postalCode}</span>
          </div>
          <div class="timezone">
            <span>Timezone</span>
            <span class="timezone-result">UTC ${obj.location.timezone}</span>
          </div>
          <div class="isp">
            <span>ISP</span>
            <span class="isp-result">${obj.isp}</span>
          </div>
  `;
  lowerDiv.classList.remove("hidden");
  middleDiv.classList.remove("hidden");
};
