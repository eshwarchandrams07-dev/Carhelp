const apiUrl = "http://localhost:3000/cars";

async function loadCars() {
    try {
        let res = await fetch(apiUrl);
        return await res.json();
    } catch {
        return [];
    }
}

async function showCars() {
    let minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    let maxPrice = parseFloat(document.getElementById("maxPrice").value) || 1000;
    let type = document.getElementById("type").value;

    let prefComfort = document.getElementById("prefComfort").value;
    let prefPerformance = document.getElementById("prefPerformance").value;
    let prefFeatures = document.getElementById("prefFeatures").value;
    let prefSafety = document.getElementById("prefSafety").value;

    let results = document.getElementById("results");
    results.innerHTML = "";

    let cars = await loadCars();
    let found = false;
    minPrice *= 100000; maxPrice *= 100000;

    for (let car of cars) {
        let match = (!type || car.type === type)
                    && car.price >= minPrice && car.price <= maxPrice
                    && (!prefComfort || car.comfort === prefComfort)
                    && (!prefPerformance || car.performance === prefPerformance)
                    && (!prefFeatures || car.features === prefFeatures)
                    && (!prefSafety || car.safety === prefSafety);

        if (match) {
            results.innerHTML += `
                <div class="car">
                    <h3>${car.name}</h3>
                    <p>Type: ${car.type}</p>
                    <p>Price: ₹${car.price.toLocaleString()}</p>
                    <p>Comfort: ${car.comfort}, Performance: ${car.performance}, Features: ${car.features}, Safety: ${car.safety}</p>
                </div>`;
            found = true;
        }
    }

    if (!found) results.innerHTML = "<p>No cars found. Add some!</p>";
}

async function addCar() {
    let name = document.getElementById("carName").value;
    let price = parseFloat(document.getElementById("carPrice").value);
    let type = document.getElementById("carType").value;

    let comfort = document.getElementById("carComfort").value;
    let performance = document.getElementById("carPerformance").value;
    let features = document.getElementById("carFeatures").value;
    let safety = document.getElementById("carSafety").value;

    if (!name || !price || !type || !comfort || !performance || !features || !safety) {
        alert("Fill all fields!");
        return;
    }

    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name, price: price*100000, type, comfort, performance, features, safety
        })
    });

    alert("Car added!");
    showCars();
}