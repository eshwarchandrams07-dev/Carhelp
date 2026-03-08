const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Start empty — no predefined cars
let cars = [];

// Get all cars
app.get("/cars", (req, res) => {
    res.json(cars);
});

// Add new car
app.post("/cars", (req, res) => {
    const { name, price, type, comfort, performance, features, safety } = req.body;

    if (!name || !price || !type || !comfort || !performance || !features || !safety) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    cars.push({ name, price, type, comfort, performance, features, safety });
    res.json({ message: "Car added successfully!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));