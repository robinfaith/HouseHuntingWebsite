const properties = [
    {
        name: "Kisii Town Apartments",
        image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800",
        location: "Kisii Town",
        type: "One Bedroom",
        bedrooms: 1,
        price: 8000,
        latitude: -0.681737,
        longitude: 34.766665,
        amenities: "Water, Security, Parking",
        availability:"Available"
    },
    {
        name: "Nyamache Family Homes",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        location: "Nyamache",
        type: "Two Bedroom",
        bedrooms: 2,
        price: 12000,
        latitude: -0.855080,
        longitude: 34.828520,
        amenities: "Water, Parking, Security",
        availability:"Available"
    },
    {
        name: "Ogembo Modern Apartments",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        location: "Ogembo",
        type: "One Bedroom",
        bedrooms: 1,
        price: 7500,
        latitude: -0.799570,
        longitude: 34.725030,
        amenities: "Water, Security, Parking",
        availability:"Occupied"
    },
    {
        name: "Keroka Spacious Homes",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
        location: "Keroka",
        type: "Three Bedroom",
        bedrooms: 3,
        price: 18000,
        latitude: -0.777230,
        longitude: 34.946210,
        amenities: "Water, Parking, Security",
        availability:"Available"
    },
    {
        name: "Kisii Central Bedsitters",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        location: "Kisii Town",
        type: "Bedsitter",
        bedrooms: 0,
        price: 5000,
        latitude: -0.681737,
        longitude: 34.766665,
        amenities: "Water, Security",
        availability:"Available"
    },
    {
        name: "Nyamache Family Apartments",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
        location: "Nyamache",
        type: "Three Bedroom",
        bedrooms: 3,
        price: 16000,
        latitude: -0.855080,
        longitude: 34.828520,
        amenities: "Water, Parking, Security",
        availability:"Occupied"
    }
];

const propertyContainer = document.getElementById("propertyContainer");
const searchButton = document.getElementById("searchButton");
const locationSearch = document.getElementById("locationSearch");
const houseType = document.getElementById("houseType");

function displayProperties(propertyList) {

    propertyContainer.innerHTML = "";

    propertyList.forEach(function(property) {

        const card = document.createElement("div");

        card.className = "property-card";

        card.innerHTML = `
            <div class="property-image">
            <img src="${property.image}" alt="${property.name}">
            </div>
            <div class="property-info">

                <h3>${property.name}</h3>

                <p>📍 ${property.location}</p>

                <p>🏠 ${property.type}</p>

               <p>🛏 ${property.bedrooms} Bedroom(s)</p>

<p class="availability">
    ${property.availability === "Available" ? "🟢 Available" : "🔴 Occupied"}
</p>

<p class="price">
    KSh ${property.price.toLocaleString()} / month
</p>                <button
                    class="view-button"
                    onclick="viewProperty('${property.name}')">
                    View Details
                </button>

            </div>
        `;

        propertyContainer.appendChild(card);
    });
}


searchButton.addEventListener("click", function() {

    const location =
        locationSearch.value.trim().toLowerCase();

    const type = houseType.value;

const maxPrice =
    Number(document.getElementById("maxPrice").value);

   const results = properties.filter(function(property) {

    const locationMatches =
        location === "" ||
        property.location.toLowerCase().includes(location);

    const typeMatches =
        type === "" ||
        property.type === type;

    const priceMatches =
        maxPrice === 0 ||
        property.price <= maxPrice;

    const availabilityMatches =
        property.availability === "Available";

    return locationMatches &&
           typeMatches &&
           priceMatches &&
           availabilityMatches;
});
    displayProperties(results);
});
let propertyMap = null;

function viewProperty(propertyName) {

    const property = properties.find(function(item) {
        return item.name === propertyName;
    });

    if (!property) {
        alert("Property not found.");
        return;
    }
    
    document.getElementById("modalPropertyImage").src =
    property.image;
    document.getElementById("modalPropertyName").textContent =
        property.name;
    const whatsappButton =
    document.getElementById("whatsappButton");

const message = encodeURIComponent(
    "Hello, I am interested in " + property.name +
    " located in " + property.location +
    ". Is it still available?"
);

whatsappButton.href =
    "https://wa.me/254710152822?text=" + message;

    document.getElementById("modalLocation").textContent =
        "📍 " + property.location;

    document.getElementById("modalType").textContent =
        "🏠 " + property.type;

    document.getElementById("modalBedrooms").textContent =
        "🛏 " + property.bedrooms + " Bedroom(s)";

    document.getElementById("modalPrice").textContent =
        "KSh " + property.price.toLocaleString() + " / month";

    document.getElementById("modalAmenities").textContent =
        property.amenities;

    document.getElementById("propertyModal").style.display = "flex";


    // Create the map
    setTimeout(function() {

        if (propertyMap !== null) {
            propertyMap.remove();
        }

        propertyMap = L.map("propertyMap").setView(
            [property.latitude, property.longitude],
            14
        );

       L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles &copy; Esri"
    }
).addTo(propertyMap);
        L.marker([
            property.latitude,
            property.longitude
        ])
        .addTo(propertyMap)
        .bindPopup(property.name)
        .openPopup();

    }, 300);
}

const closeModal =
    document.getElementById("closeModal");

closeModal.addEventListener("click", function() {

    document.getElementById("propertyModal").style.display = "none";

});


window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("propertyModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

});


displayProperties(properties);
// ========================================
// MAIN GPS MAP
// ========================================

const map = L.map("map").setView(
    [-0.681737, 34.766665],
    11
);

L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles &copy; Esri"
    }
).addTo(map);
// Add available houses to the map

function addPropertyMarker(property) {

    if (property.availability === "Available") {

        L.marker([
            property.latitude,
            property.longitude
        ])
        .addTo(map)
        .bindPopup(
            "<strong>" + property.name + "</strong><br>" +
            "📍 " + property.location + "<br>" +
            "🏠 " + property.type + "<br>" +
            "🛏 " + property.bedrooms + " Bedroom(s)<br>" +
            "💰 KSh " + property.price.toLocaleString() + " / month<br>" +
            "🟢 Available<br><br>" +
            "<button onclick=\"viewProperty('" +
            property.name +
            "')\">View Details</button>"
        );

    }
}
// Add existing available houses to the map
properties.forEach(function(property) {
    addPropertyMarker(property);
});
// ========================================
// REQUEST VIEWING
// ========================================

const viewingButton =
    document.getElementById("viewingButton");

const viewingModal =
    document.getElementById("viewingModal");

const closeViewingModal =
    document.getElementById("closeViewingModal");

const viewingForm =
    document.getElementById("viewingForm");

const viewingPropertyName =
    document.getElementById("viewingPropertyName");

viewingButton.addEventListener("click", function() {

    const propertyName =
        document.getElementById("modalPropertyName").textContent;

    viewingPropertyName.textContent =
        "Property: " + propertyName;

    viewingModal.style.display = "flex";
});


closeViewingModal.addEventListener("click", function() {

    viewingModal.style.display = "none";

});


viewingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("visitorName").value;

    viewingMessage.textContent =
        "Viewing request submitted successfully for " + name + ".";

    viewingForm.reset();

});
// ========================================
// LOGIN AND REGISTRATION
// ========================================

const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");


// Open Login
loginLink.addEventListener("click", function() {

    loginModal.style.display = "flex";

});


// Open Register
registerLink.addEventListener("click", function() {

    registerModal.style.display = "flex";

});


// Close Login
closeLogin.addEventListener("click", function() {

    loginModal.style.display = "none";

});


// Close Register
closeRegister.addEventListener("click", function() {

    registerModal.style.display = "none";

});


// Login form
loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    loginMessage.textContent =
        "Login successful! Welcome to HouseHunting.com.";

    loginForm.reset();

});


// Registration form
registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value;

    registerMessage.textContent =
        "Account created successfully. Welcome " + name + "!";

    registerForm.reset();

});
// ========================================
// LIST PROPERTY
// ========================================

const listPropertyLink =
    document.getElementById("listPropertyLink");

const listPropertyModal =
    document.getElementById("listPropertyModal");

const closeListProperty =
    document.getElementById("closeListProperty");

const propertyForm =
    document.getElementById("propertyForm");

const propertyMessage =
    document.getElementById("propertyMessage");


// Open List Property form
listPropertyLink.addEventListener("click", function(event) {

    event.preventDefault();

    listPropertyModal.style.display = "flex";

});


// Close List Property form
closeListProperty.addEventListener("click", function() {

    listPropertyModal.style.display = "none";

});


// Submit property
propertyForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("propertyName").value;

    const location =
        document.getElementById("propertyLocation").value;

    const type =
        document.getElementById("propertyType").value;

    const price =
        Number(document.getElementById("propertyPrice").value);

    const bedrooms =
        Number(document.getElementById("propertyBedrooms").value);

    const amenities =
        document.getElementById("propertyAmenities").value;


    // Coordinates for selected Kisii areas
    let latitude = -0.681737;
    let longitude = 34.766665;

    if (location === "Nyamache") {
        latitude = -0.855080;
        longitude = 34.828520;
    }

    if (location === "Ogembo") {
        latitude = -0.799570;
        longitude = 34.725030;
    }

    if (location === "Keroka") {
        latitude = -0.777230;
        longitude = 34.946210;
    }


    const newProperty = {

        name: name,
        location: location,
        type: type,
        bedrooms: bedrooms,
        price: price,
        latitude: latitude,
        longitude: longitude,
        amenities: amenities,
        availability:"Available"
    };


    properties.push(newProperty);

displayProperties(properties);

addPropertyMarker(newProperty);

    propertyMessage.textContent =
        "Property listed successfully!";

    propertyForm.reset();

});

const footerListProperty =
    document.getElementById("footerListProperty");

footerListProperty.addEventListener("click", function(event) {
    event.preventDefault();
    listPropertyModal.style.display = "flex";
}); 

const backToTopButton =
    document.getElementById("backToTop");

window.addEventListener("scroll", function() {

    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }

});

backToTopButton.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});