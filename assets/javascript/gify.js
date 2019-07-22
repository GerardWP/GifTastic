$(document).ready(function () {


    var topics = ["dog", "rat", "bear", "cat", "sloth"];


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

        $(".gif-zone").empty();

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

                var gifDiv = $("<div>");

                var r = $("<h3>");

                var stillGif = gif.images.fixed_height_still.url;
                var movingGif = gif.images.fixed_height.url;

                var gifImg = $('<img' + ' src="' + stillGif + '">');

                gifDiv.addClass("gif-box");

                gifImg.addClass("gif");
                gifImg.attr("data-moving", movingGif);
                gifImg.attr("data-still", stillGif);
                gifImg.attr("data-state", "still");

                r.addClass("ratingText");
                r.text("Rating: " + gif.rating);

                gifDiv.append(r, gifImg);

                $(".gif-zone").append(gifDiv);

            });

        });

        // $(".gif").on("click", function () {

        //     var state = $(this).attr("data-state");

        //     if (state === "still") {
        //         $(this.attr("src", movingGif));
        //         $(this).attr("data-state", "moving");
        //     } else {
        //         $(this.attr("src", stillGif));
        //         $(this).attr("data-state", "still");
        //     };


        // });

        $(document).on("click", ".gif", function () {

            var state = $(this).attr("data-state");

            var movingSrc = $(this).attr("data-moving");
            var stillSrc = $(this).attr("data-still");

            if (state === "still") {
                $(this).attr("src", movingSrc);
                $(this).attr("data-state", "moving");
            } else {
                $(this).attr("src", stillSrc);
                $(this).attr("data-state", "still");
            };

        });

    });







});