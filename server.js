// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");

// MongoDB stuff
// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "scrape";
var collections = ["platntedTank"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// var db = require("./models");

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// 2. At the "/all" path, display every entry in the plantedTank collection
app.get("/", function(req, res) {
  // Query: In our database, go to the plantedTank collection, then "find" everything
  db.plantedTank.find({}, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 3. At the "/name" path, display every entry in the plantedTank collection, sorted by name
app.get("/title", function(req, res) {
  // Query: In our database, go to the plantedTank collection, then "find" everything,
  // but this time, sort it by name (1 means ascending order)
  db.plantedTank.find().sort({ title: 1 }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 4. At the "/weight" path, display every entry in the plantedTank collection, sorted by weight
app.get("/image", function(req, res) {
  // Query: In our database, go to the plantedTank collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
  db.plantedTank.find().sort({ image: -1 }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and image\n" +
            "from reddit's Planted Tank board:" +
            "\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
axios.get("https://www.reddit.com/r/PlantedTank/").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("span.y8HYJ-y_lTUHkQIc1mdCq").each(function(i, element) {
    var a = $(this);
    // Save the link of the element in a "title" variable
    var title = a.text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = a.children().attr("href");

    $("img._2_tDEnGMLxpM6uOa2kaDB3.media-element").each(function(i, element){
      var a = $(this);
      var image = a.attr("src");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link,
      image: image
    });
  });
});

// // Create a new object in the DB
// db.plantedTank.create(result)
// .then(function(dbArticle) {
//   // View the added result in the console
//   console.log(dbArticle);
// })
// .catch(function(err) {
//   // If an error occurred, log it
//   console.log(err);
// });


  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
// });

});