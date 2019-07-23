$(document).ready(function () {


    var topics = ["Seinfeld", "Stranger Things", "The Simpsons", "Rick and Morty", "Westworld", "Breaking Bad", "Adventure Time", "Dragonball Z",
        "Bojack Horseman", "The Office", "Game of Thrones", "Survivor"
    ];


    function createButtons() {

        $(".button-zone").empty();

        topics.forEach(i => {

            var pageBtn = $("<button>");

            pageBtn.addClass("topic");
            pageBtn.attr("data-name", i);
            pageBtn.text(i);
            $(".button-zone").append(pageBtn);

        });

    };

    createButtons();




    $(document).on("click", ".topic", function () {

        $(".gif-zone").empty();

        var apiKey = "LU5QsIl3S1DSEVAfaJpYZcM6rrQs91Y1";

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text().toLowerCase() + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var results = response.data;



            results.forEach((gif, index) => {

                var stillGif = gif.images.fixed_height_still.url;
                var movingGif = gif.images.fixed_height.url;

                var gifDiv = $("<div>");
                var r = $("<h3>");
                var gifImg = $('<img' + ' src="' + stillGif + '">');
                var favBtn = $("<button>");

                favBtn.addClass("fav-button").attr("data", "gif-" + (index + 1)).text("Save to Favourites");

                gifDiv.addClass("gif-box");

                gifImg.addClass("gif").attr("id", "gif-" + (index + 1));
                gifImg.attr("data-moving", movingGif).attr("data-still", stillGif).attr("data-state", "still");

                r.text("Rating: " + gif.rating);

                gifDiv.append(r, gifImg, favBtn);

                $(".gif-zone").append(gifDiv);

            });

        });


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

    $("#add-gif").on("click", function () {

        event.preventDefault();

        $(".button-zone").empty();


        var newGif = $("#new-gif").val().trim();

        topics.push(newGif);

        createButtons();

        $("#new-gif").val("");

    });





});