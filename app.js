var express = require("express"),
    path = require("path"),
    bodyParser =  require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    pg = require("pg");

var app = express();

// Connect to DB
var connect = 'postgresql://slavyane:1101@localhost/image-storage';

// Assign dust
app.engine("dust", cons.dust);

// Set Default Ext .dust
app.set("view engine", "dust");
app.set("views", __dirname + "/views");

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Request
app.get("/", function (req, res) {
    console.log("TEST");
    res.render("index");
});

// Server
app.listen(3000, function () {
    console.log("Server Started On Port 3000");
});
