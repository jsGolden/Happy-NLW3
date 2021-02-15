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
    iconAnchor: [29, 68]
});

let marker;

//create and add markers
map.on("click", (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // clear icons
    marker && map.removeLayer(marker);

    // add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map);
});



// add photo field
function addPhotoField() {
    // pick photo container #images
    const container = document.querySelector('#images');

    //pick container to duplicate .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload');

    //Pick add photo button
    const addPhotoButton = document.querySelector('.input-block.images button');

    //check the photo limit (6)
    if(fieldsContainer.length >= 6) {
        //Animate shake button
        addPhotoButton.classList.add('animate-shake');
        setTimeout(() => {
            addPhotoButton.classList.remove('animate-shake');
        }, 600);
        return;
    }

    //accomplish the clone of last image added
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

    // Create delete input
    const deleteSpan = `
        <span onclick="deleteField(event)">
            <img
            src="/images/remove-file.svg"
            alt="Remover foto"
            />
        </span>
    `;

    // verify if input text is null
    const input = newFieldContainer.children[0];
    if(input.value == "") return;

    //Add delete input to first and last added input
    if(fieldsContainer.length < 2) {
        fieldsContainer[0].insertAdjacentHTML('beforeend', deleteSpan);
        newFieldContainer.insertAdjacentHTML('beforeend', deleteSpan);
    }
    
    // clear text input
    input.value = "";

    // add the clone to image container
    container.appendChild(newFieldContainer);

    //Disable add photo button if reach the limit
    if(fieldsContainer.length + 1 >= 6)
    {
        addPhotoButton.classList.add('disabled');
    }
}

function deleteField(event) {
    const span = event.currentTarget;
    span.parentNode.remove();

    const fieldsContainer = document.querySelectorAll('.new-upload');
    if(fieldsContainer.length < 6)
    {
        const addPhotoButton = document.querySelector('.input-block.images button');
        addPhotoButton.classList.remove('disabled');
    }

    if(fieldsContainer.length < 2) {
        const toDeleteSpan = document.querySelector('.new-upload > span');
        toDeleteSpan.remove();
        return;
    }
}

// open on weekends toggler
function toggleSelect(event) {
    //remove all classes .active
    document.querySelectorAll('.button-select button')
    .forEach(button => button.classList.remove('active'));

    //put class .active
    const button = event.currentTarget;
    button.classList.add('active');

    //refresh hidden input w/ value selected
    const input = document.querySelector('[name="open_on_weekends"]');

    //get and data-value
    input.value = button.dataset.value;
    console.log(input);

}

function validateOrphanage(event) {
    const spanLat = document.querySelector('[name=lat]').value;
    const spanLng = document.querySelector('[name=lng]').value;
    if(spanLat == "" || spanLng == ""){
        alert('Selecione um ponto no mapa!');
        event.preventDefault();
        return;
    }
}
