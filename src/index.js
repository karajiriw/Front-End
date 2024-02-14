const express = require("express");
const axios = require("axios");
var bodyParser = require("path");
const app = express();

//const base_url = "https://api.example.com";
const base_url = "http://node41091-noderest.proen.app.ruk-com.cloud";

app.set("Views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));