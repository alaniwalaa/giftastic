var apiKey="DDj1p7UJaRN7cZbl0rffnQr2mKr5D3tQ";
var buttons;
var animalNames = [];
var query="";
var queryURL="";




// app logic 
$(document).ready(function(){
    $("#submitButton").on("click", function(event){
        event.preventDefault();
        query=$("#animalInput").val().trim();
        animalNames.push(query);
        console.log(animalNames);
        function renderButton(){
            $("#buttons").empty();
            for (var i=0; i<animalNames.length; i++){
                buttons=$("<button class='buttonSearch'>");
                buttons.attr("data-type", animalNames[i]);
                buttons.text(animalNames[i]);
                $("#buttons").append(buttons);
            }
        }
        renderButton();
    })
    $(document.body).on("click", ".buttonSearch", function(){
        var animal=$(this).data("type");
        console.log(animal);
        queryURL="https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apiKey + "&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
            for (i=0; i<response.data.length; i++){
                var animalDiv=$("<div class='float-sm-left'>");
                var animalImage=$("<img class='gifs'>");
                var rating=$("<P> rating: "+ response.data[i].rating+"</p>");
                var still=response.data[i].images.fixed_height_still.url;
                var animate=response.data[i].images.fixed_height.url;
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animate);
                animalImage.attr("data-state", "still");
                animalDiv.append(animalImage);
                animalDiv.append(rating);
                $("#gifs").prepend(animalDiv);

            }
        })

    })
    $(document.body).on("click", ".gifs", function(){
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    })

})
