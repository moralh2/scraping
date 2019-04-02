// Whenever someone clicks #scrape
$("#scrape").on("click", function() {
  
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/scrape1"
    })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data)
    });
});