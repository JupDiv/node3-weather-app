const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Hlib Laskin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Hlib Laskin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "If you need help, help yourself",
    title: "Help",
    name: "Hlib Laskin",
  });
});
/**/
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address not correct, pls try again",
    });
  } else {
    geocode(
      req.query.address,
      (error, { longitude, latitude, location } = {}) => {
        if (error) {
          return res.send({
            error,
          });
        }
        forecast(longitude, latitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error,
            });
          } else {
            res.send({
              forecast: forecastData,
              location,
              city: req.query.address,
            });
          }
        });
      },
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    title: "Help page",
    name: "Hlib Laskin",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
    title: "404 error",
    name: "Hlib Laskin",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
