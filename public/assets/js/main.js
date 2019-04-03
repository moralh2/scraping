// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

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
    $(".save-article").on("click", function(event) {

      var id = $(this).data("id");
  
      var change = {
        saved: true
      };
  
      // Send the PUT request.
      $.ajax({
        // data: change,
        method: "PUT",
        url: "/articles/" + id
      }).then(
        function() { location.reload() }
      );
    });


});