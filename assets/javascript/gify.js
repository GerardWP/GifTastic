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

    var storedFavs = localStorage.getItem("favGifs");

    var storedArray = JSON.parse(storedFavs);

    createFavs(storedArray);

    createButtons();

});

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
            gifImg.attr("data_moving", movingGif).attr("data_still", stillGif).attr("data_state", "still");

            r.text("Rating: " + gif.rating);

            gifDiv.append(r, gifImg, favBtn);

            $(".gif-zone").append(gifDiv);

        });

    });




});



var gifArray = [];

$(document).on("click", ".fav-button", function () {


    var targetGif = $(this).siblings('img');

    var gifData = targetGif[0].attributes;

    // console.log([gifData[3].value, gifData[4].value]);

    var saveGif = [gifData[3].value, gifData[4].value];

    gifArray.push(saveGif);

    localStorage.setItem("favGifs", JSON.stringify(gifArray));

    console.log(gifArray);

    $(".fav-box").empty();

    createFavs(gifArray);

});


function createFavs(x) {

    for (var i = 0; i < x.length; i++) {

        var favGif = $('<img ' + 'style="margin: 0 4px 4px 0" src="' + x[i][1] + '">');
        favGif.addClass(".gif").attr("data_moving", x[i][0]).attr("data_still", x[i][1]).attr("data_state", "still");

        $(".fav-box").append(favGif);
    }

};


$(document).on("click", ".gif", function () {

    var state = $(this).attr("data_state");

    var movingSrc = $(this).attr("data_moving");
    var stillSrc = $(this).attr("data_still");

    if (state === "still") {
        $(this).attr("src", movingSrc);
        $(this).attr("data_state", "moving");
    } else {
        $(this).attr("src", stillSrc);
        $(this).attr("data_state", "still");
    };

});

$("#add-gif").on("click", function () {

    event.preventDefault();

    $(".button-zone").empty();


    var newGif = $("#new-gif").val().trim();

    topics.push(newGif);

    createButtons();

    $("#new-gif").val("");

});