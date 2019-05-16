var express = require("express"),
    path = require("path"),
    bodyParser =  require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    http = require('http'),
    multer = require('multer'),
    multipart = require('connect-multiparty'),
    app = express();

const { parse } = require('querystring');

var port = 2000;


// Random Picture Name Generator
var extension = ".jpg";

function name_generator(length, extension) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return Date.now() + "_" + result + extension;
}

var current_name = name_generator(16, extension);

function chose_name(new_) {
    if (new_) {
        current_name = name_generator(16, extension);
        return current_name;
    }
    else { return current_name; }
}

// Create Storage
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, callback) {

        pool.connect(function (err, client, done) {
            if(err) { return console.error("error fetching client from pool;", err); }

            client.query("INSERT INTO pictures(picture_name, picture_path) VALUES($1, $2)", [req.body.picture_name, chose_name(false)]);
            client.query("INSERT INTO users(nickname, upload_date) VALUES($1, now());", [req.body.nickname]);
            done();
        });

        callback(null, chose_name(true));
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3);


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

// Log Request
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

// Upload Image
app.post("/upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) { return res.end("Something went wrong!" );}
    });

    res.redirect("/");
});

// Server
app.listen(port, function () {
    console.log("Server Started On Port " + port);
});
