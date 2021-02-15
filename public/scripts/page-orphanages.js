//Create map
const map = L.map('mapid').setView([-27.2194621, -49.6452641], 15);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        map.setView([position.coords.latitude, position.coords.longitude], 15);
    });
}

//Create and add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//Create Icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

function addMarker({ id, name, lat, lng }) {
    //Create PopUp Overlay
    const popup = L.popup({
        closeButton: false,
        className: "map-popup",
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="/orphanage?id=${id}"> <img src="/images/arrow-white.svg" > </a>`);


    //Create and add marker
    L.marker([lat, lng], { icon })
        .addTo(map)
    .bindPopup(popup);
}

const orphanagesSpan = document.querySelectorAll('.orphanages span');
orphanagesSpan.forEach(span => {
    const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
    }

    addMarker(orphanage);
});
