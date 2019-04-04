// Wait to attach handlers until the DOM loads
$(function() {

  // Scrape articles
  $("#scrape").on("click", function() {
    $.ajax({
      method: "GET",
      url: "/scrape1"
    }).then(
      function() {
        window.location.replace('/articles/new') 
      }
    );
  })

  // Click event to save article(id)
  $(".article-save").on("click", function(event) {
    var id = $(this).data("id");
    // Send the PUT request
    $.ajax({
      method: "PUT",
      url: "/articles/" + id
    }).then(
      function() { location.reload() }
    );
  });


  $(".article-note").on("click", function(event) {
    var id = $(this).data("id")
    // Send the PUT request.
    $.ajax({
      // data: change,
      method: "PUT",
      url: "/articles/" + id
    }).then(
      function() { location.reload() }
    );
  });


  $(".new-note-submit").on("click", function(event) {
    // event.preventDefault()
    var id = $(this).data("id")

    console.log(id)

    var eleId = "#new-note-post-" + id

    console.log(eleId)

    var noteText = $(eleId).val()

    console.log(noteText)

    var data = { 'body': noteText }

    // Send the PUT request
    $.ajax({
      data: data,
      method: "POST",
      url: "/articles/" + id
    }).then(
      function() { location.reload() }
    );
  });


});