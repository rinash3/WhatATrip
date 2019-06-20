$("#date_depart").datepicker({
    dateFormat: "yy-mm-dd"
}).datepicker("setDate", "0");

$("#date_return").datepicker({
    dateFormat: "yy-mm-dd"
}).datepicker("setDate", "0");


$("#dest").change(function() {
     var cityId = $(this).find(':selected').data('id');
     var queryURL = "https://api.tripadvisor.com/api/partner/2.0/location/" + cityId + "/attractions?key=2f5aef9e-d399-4298-9986-ea6305c270a8";
var cityId2=$(this).find(':selected').data('id2');
var queryURL2="https://api.openweathermap.org/data/2.5/forecast?id=" + cityId2 + "&units=imperial&APPID=2ab31e3272a311a360bcba6d67e3f186"

    $("#srch").on("click", function(event) {

                       $.ajax({
                        url: queryURL2,
                        method: "GET"
                    }).then(function(response2) {
                        $(".cityWeather").html("");
                        $(".cityWeather").html("<h2>Current Weather</h2>");
                        var cityName = $(this).find(':selected').val()
                       console.log(response2);
                       for (let i = 0; i < 5; i++) {
                       var cityTemp=$("<i>").html(response2.list[i].dt_txt + " "  + " </br> " + "Temp:" + "     " + response2.list[i].main.temp + " F " + "   ");
                       //var cityDate=$("<p>").html("<h4>Date: </h4>" );
                       console.log(cityTemp);
                       //console.log(cityDate);
                     $(".cityWeather").append(cityTemp);
                       }
                    })
                        
                    $.ajax({
                        url: queryURL,
                        method: "GET" 
                    }).then(function(response) {
                     
                        $(".cityAttr").empty();
                        $("<div id=city-view></div>").appendTo("#city");
                        for (let i = 0; i <5; i++) {
                        var respParse = JSON.parse(response);
                    
                        // $("#city-view").text(respParse.data[0].address_obj.address_string);
                        var rest1 = $("<div id='rest1'>");
                        var rest1Adress = respParse.data[i].address_obj.address_string;
                        var rating = $('<div class="rating">').html("<h5>Rating:</h5>" +(respParse.data[i].rating));
                        var name = $('<div class="name">').html("<h5>Name:</h5>" + (respParse.data[i].name));
                        var description = $('<div class="description">').html("<h5>Description:</h5>" +(respParse.data[i].description));
                        var pOne = $('<div class="address">').html("<h5>Address: </h5>" + rest1Adress);
                        $(".cityAttr").append(name, rating, pOne, description);
                       
                       
                      }
                    });

                });
            });  