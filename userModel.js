var request = require('request');
var cheerio = require('cheerio');

request('https://www.reddit.com/r/PlantedTank/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $("img._2_tDEnGMLxpM6uOa2kaDB3.media-element").each(function(i, element){
      // <img class="_2_tDEnGMLxpM6uOa2kaDB3 media-element" 
      var a = $(this);
    //   var rank = a.parent().parent().text();
      // var image = a.text();
      var image = a.attr("src");
    //   var subtext = a.parent().parent().next().children('.subtext').children();
    //   var points = $(subtext).eq(0).text();
    //   var username = $(subtext).eq(1).text();
    //   var comments = $(subtext).eq(2).text();
      // Our parsed meta data object
      var metadata = {
        // rank: parseInt(rank),
        // title: title,
        image: image
        // points: parseInt(points),
        // username: username,
        // comments: parseInt(comments)
      };
      console.log(metadata);
    });
  }
});