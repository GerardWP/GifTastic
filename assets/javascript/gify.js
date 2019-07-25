$(document).ready(function () {


    var topics = ["Seinfeld", "Stranger Things", "The Simpsons", "Brookly Nine Nine", "Rick and Morty", "Breaking Bad", "Adventure Time", "Dragonball Z",
        "Bojack Horseman", "The Office", "Always Sunny in Philadelphia"
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

    $("#add-gif").on("click", function () {

        event.preventDefault();

        $(".button-zone").empty();


        var newGif = $("#new-gif").val().trim();

        topics.push(newGif);

        createButtons();

        $("#new-gif").val("");

    });

    fromSaved();
    createButtons();

    // to remove from favourites, try splicing from the gifArray, and then recreateing the favourites section

});

$(document).on("click", ".topic", function () {

    $(".gif-zone").empty();

    var apiKey = "LU5QsIl3S1DSEVAfaJpYZcM6rrQs91Y1";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text().toLowerCase() + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

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
var storedArray;
var storedFavs;

var gifArray = [];
$(document).on("click", ".fav-button", function () {

    var targetGif = $(this).siblings('img');

    var gifData = targetGif[0].attributes;

    var saveGif = [gifData[3].value, gifData[4].value];

    gifArray.push(saveGif);

    $(".stored-favs").empty();

    localStorage.setItem("favGifs", JSON.stringify(gifArray));

    createFavs(gifArray);

});

var storedFavs = localStorage.getItem("favGifs");

var storedArray = JSON.parse(storedFavs);

function fromSaved() {

    if (storedArray) {
        for (var i = 0; i < storedArray.length; i++) {
            gifArray.push(storedArray[i])
        };
        createFavs(storedArray);
    } else return;

};


function createFavs(x) {

    for (var i = 0; i < x.length; i++) {

        var gifWrap = $("<div>");
        var removeBtn = $("<button>")
        var favGif = $('<img ' + 'src="' + x[i][1] + '">');

        removeBtn.text("Remove").addClass("remove-btn");
        favGif.addClass("gif fav-gif").attr("data_moving", x[i][0]).attr("data_still", x[i][1]).attr("data_state", "still");
        gifWrap.addClass("gif-box");
        gifWrap.append(favGif).append(removeBtn);

        $(".stored-favs").append(gifWrap);
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