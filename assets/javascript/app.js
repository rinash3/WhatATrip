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
                        $(".cityWeather").html("<h2>The header above the ajax output</h2>");
                       console.log(response2);
                       for (let i = 0; i < 2; i++) {
                       var cityTemp=$("<i>").html("<h4>Date and Temp: </h4>" + response2.list[i].main.temp +"F"+ "       "+ "Date:" +"  " + response2.list[i].dt_txt);
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
                        console.log(respParse);
                        console.log(respParse.data[i].address_obj.address_string);
                        console.log(respParse.data[i].description);

                        // $("#city-view").text(respParse.data[0].address_obj.address_string);
                        var rest1 = $("<div id='rest1'>");
                        var rest1Adress = respParse.data[i].address_obj.address_string;
                        var rating = $('<div class="rating">').html("<h3>Rating:</h3>" +(respParse.data[i].rating));
                        var name = $("<p>").html("<h3>Name:</h3>" + (respParse.data[i].name));
                        var description = $("<p>").html("<h3>Description:</h3>" +(respParse.data[i].description));
                        var pOne = $("<p>").html("<h3>Address: </h3>" + rest1Adress);
                        $(".cityAttr").append(name, rating, pOne, description);
                       
                       
                      }
                    });

                });
            });  