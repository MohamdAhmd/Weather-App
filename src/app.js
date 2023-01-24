const express = require("express");
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv");
const weatherData = require("../utils/weatherData");
//----------------------------------------------------------------------------------
const app = express();
dotenv.config();

// serve static failes css and js
app.use(express.static(path.join(__dirname, "../public")));

// serve partials file which in this case header but in anther apps could be alse navbar, header, footer
const partialsPath = path.join(__dirname, "../views/partials");
// set type of view engine
app.set("view engine", "hbs");
// set view engine to reade files from views folder
app.set("views", "views");
hbs.registerPartials(partialsPath);

//Get The Home Page
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

// Post Data From Main Page
app.get("/weather", (req, res) => {
  const address = req.query.address;
  //----------------------------------------------------------------------------------------
  if (!address) {
    return res.send({
      error: "You must enter address in search text box",
    });
  }
  //----------------------------------------------------------------------------------------
  //weatherData(address,callback)
  weatherData(address, (error, { temperature, description, cityName } = {}) => {
    if (error) {
      return res.status(404).send({ error: error });
    }
    //console.log(temperature, description, cityName);
    res.send({ temperature, description, cityName });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "page not found",
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
