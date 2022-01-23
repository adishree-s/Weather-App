const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { env } = require("process");

const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const templateDirectoryPath = path.join(__dirname, "../templates/views");
const partialDirectoryPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", templateDirectoryPath);
hbs.registerPartials(partialDirectoryPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aditya Agrawal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Aditya Agrawal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Help documentation",
    name: "Aditya Agrawal",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Aditya Agrawal",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found",
    name: "Aditya Agrawal",
  });
});

app.listen(port, () => {
  console.log("Server is up on " + port);
});
