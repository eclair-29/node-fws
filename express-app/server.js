/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");

const members = require("./routes/api/members");
const home = require("./routes/pages/home");

// Initialize express app
const app = express();

// Initialize middleware(s)
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rendered routes
app.use("/", home);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Route handlers
app.use("/api/members", members);

// Listen to a port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server now running at port ${PORT}`));
