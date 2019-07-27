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

// on-click fucntion quearying the API, generatring the gifs and appending them to the gif-zone

$(document).on("click", ".topic", function () {

    $(".gif-zone").empty();

    var apiKey = "LU5QsIl3S1DSEVAfaJpYZcM6rrQs91Y1";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text().toLowerCase() + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(response)

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

// function to create favs. pushes the moving and still data attributes into the gifArray
// and recreates gif in favs using that data. also stores the current gifArray in localStorage so the gifs remain on page re-load
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


// fucntion to determine whether there are any gifs in localstorage, if there are, then if passes the array
// through the createFavs function, and adds the gifs to the stored-favs section.
function fromSaved() {

    if (storedArray) {
        for (var i = 0; i < storedArray.length; i++) {
            gifArray.push(storedArray[i])
        };
        createFavs(storedArray);
    } else return;

};

// function to create favourites - uses gifArray when adding from the loaded page, and uses storedArray 
// on page load, if storedArray exists

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


// function to remove gif saved in favourite section. 
$(document).on("click", ".remove-btn", function () {

    var gifRmv = $(this).siblings("img");
    var gifRmvAtt = gifRmv[0].attributes;

    // for loop searches gif array at each index to see if the array at each index contains the attributes
    // held by the img being stored, if it does, then it removes that from the gifArray, empties the favourites section
    // updates local storage, and recreates the faourites section with the updated gifArray.
    for (var i = 0; i < gifArray.length; i++) {
        if (gifArray[i].includes(gifRmvAtt[2].nodeValue || gifRmvAtt[3].nodeValue)) {

            gifArray.splice(i, 1);
            $(".stored-favs").empty();
            localStorage.setItem("favGifs", JSON.stringify(gifArray));
            createFavs(gifArray);

        };
    };



});

// Click fucntion to change state of gif from still, to moving. And visa-versa
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