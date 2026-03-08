$(document).foundation()

let map; 
let geocoder;
const sliderImages = [
  "./media/IMG_3511.jpeg", 
  "./media/IMG_8384.jpeg"
];
let imgIndex = 0;

function initMap() {
  const myLatLng = { lat: 36.3729, lng: -94.2088 }; // Bentonville, AR
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: myLatLng,
    disableDefaultUI: false,
    mapTypeControl: false
  });

  geocoder = new google.maps.Geocoder();

  const marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Bentonville, AR",
    animation: google.maps.Animation.DROP
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
        <div class="map-popup">
          <h4>Bentonville Headquarters</h4>
          <p>The API is now connected!</p>
        </div>`
  });

  marker.addListener("click", () => {
    infoWindow.open({ anchor: marker, map });
  });

  const searchBtn = document.getElementById("search-loc-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const address = document.getElementById("input-city").value;
      handleSearch(address);
    });
  }
}

function handleSearch(address) {
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
      map.setZoom(15);
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        animation: google.maps.Animation.DROP
      });
    } else {
      alert("Location not found: " + status);
    }
  });
}

//Slider Code starts here

function setupSlider(){
  const mediaContainer = document.querySelector(".media-container2");

  if (mediaContainer) {
    const sliderImg = mediaContainer.querySelector("img");
    if (!sliderImg) return;

    sliderImg.id = "slider-img"

    //Create Bottons
    const btnContainer = document.createElement("div");
    btnContainer.style.marginTop = "10px";
    btnContainer.style.textAlign = "left";

    const prevBtn = document.createElement("button");
    prevBtn.innerText = "Previous";
    prevBtn.style.marginBottom = "5px";
    prevBtn.onclick = () => {
      imgIndex = (imgIndex - 1 + sliderImages.length) % sliderImages.length;
      sliderImg.src = sliderImages[imgIndex];
    };

    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next";
    nextBtn.onclick = () => {
      imgIndex = (imgIndex + 1) % sliderImages.length;
      sliderImg.src = sliderImages[imgIndex];
    };

    btnContainer.appendChild(prevBtn);
    btnContainer.appendChild(nextBtn);
    mediaContainer.appendChild(btnContainer);
  }
}

window.initMap = initMap;
document.addEventListener("DOMContentLoaded", setupSlider);