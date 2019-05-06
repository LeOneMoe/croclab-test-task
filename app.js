var express = require("express"),
    path = require("path"),
    bodyParser =  require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    http = require('http'),
    app = express();

var port = 8080;

// Connect to DB
var connect = 'postgresql://slavyane:1101@localhost/image-storage';
const { Pool, Client } = require('pg');
const pool = new Pool({ connectionString: connect, });

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
    pool.connect(function (err, client, done) {
        if(err) { return console.error("error fetching client from pool;", err); }

        // Fetching Data From DB
        client.query("SELECT * FROM pictures", function (err, result) {
            if (err) { return console.error("error running query", err); }

            res.render("index", {pictures: result.rows});
            done();
        });
    });
});


app.get("/log", function (req, res) {
    pool.connect(function (err, client, done) {
        if(err) { return console.error("error fetching client from pool;", err); }

        // Fetching Data From DB
        client.query("SELECT * FROM users", function (err, result) {
            if (err) { return console.error("error running query", err); }

            res.render("index_log", {users: result.rows});
            done();
        });
    });
});

// Server
app.listen(port, function () {
    console.log("Server Started On Port 8080");
});
