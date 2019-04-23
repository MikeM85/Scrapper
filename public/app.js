// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'plantedTanks' (JSON) and creates a table body
function displayResults(plantedTanks) {
  // First, empty the table
  $("tbody").empty();

  // Then, for each entry of that json...
  plantedTanks.forEach(function(plantedTank) {
    // Append each of the plantedTank's properties to the table
    var tr = $("<tr>").append(
      $("<td>").text(plantedTank.title),
      $("<td>").text(plantedTank.link),
      $("<td>").text(plantedTank.image)
      // $("<td>").text(plantedTank.title),
      // $("<td>").text(plantedTank.whatIWouldReallyCallIt)
    );

    $("tbody").append(tr);
  });
}

// Bonus function to change "active" header
function setActive(selector) {
  // remove and apply 'active' class to distinguish which column we sorted by
  $("th").removeClass("active");
  $(selector).addClass("active");
}

// 1: On Load
// ==========

// First thing: ask the back end for json with all plantedTanks
$.getJSON("/all", function(data) {
  // Call our function to generate a table body
  displayResults(data);
});

// 2: Button Interactions
// ======================

// When user clicks the title sort button, display table sorted by title
$("#title-sort").on("click", function() {
  // Set new column as currently-sorted (active)
  setActive("#plantedTank-title");

  // Do an api call to the back end for json with all plantedTanks sorted by title
  $.getJSON("/title", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });
});

// When user clicks the link sort button, display the table sorted by link
$("#link-sort").on("click", function() {
  // Set new column as currently-sorted (active)
  setActive("#plantedTank-link");

  // Do an api call to the back end for json with all plantedTanks sorted by link
  $.getJSON("/link", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });
});
