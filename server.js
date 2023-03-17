// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(3000, () => {
  console.log("server is up!");
});

// Add a GET route that returns the projectData object in your server code
app.get("/all", (req, res) => {
  res.send(projectData);
});

//add a POST route that adds incoming data to projectData.
app.post("/add", (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData.temperature = temperature;
  projectData.date = date;
  projectData.userResponse = userResponse;
});
