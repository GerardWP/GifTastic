$(document).ready(function () {


    var topics = ["dog", "fox", "bear", "cat", "sloth"];


    // var apiKey = "LU5QsIl3S1DSEVAfaJpYZcM6rrQs91Y1";

    // var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topics[i] + "&api_key=" + apiKey + "&limit=10";

    function createButtons() {

        $(".button-zone").empty();

        for (var i = 0; i < topics.length; i++) {

            var pageBtn = $("<button>");

            pageBtn.addClass("topic");
            pageBtn.attr("data-name", topics[i]);
            pageBtn.text(topics[i]);
            $(".button-zone").append(pageBtn);
        };

    };

    createButtons();


    // temporary click function for pre-generated buttons
    $(".topic").on("click", function () {

        var apiKey = "LU5QsIl3S1DSEVAfaJpYZcM6rrQs91Y1";

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response.data);

            var results = response.data;


            results.forEach(gif => {

                console.log(gif);
                console.log(gif.rating);

                var r = $("<h3>");

                r.addClass("ratingText");

                r.text(gif.rating);

                $(".gif-zone").append(r);

            });




        });


    });







});