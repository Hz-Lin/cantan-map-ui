$( "#sendAlertButton" ).click(function() {
    alert( "Handler for .click() called." );
});

$( "#readJsonButton" ).click(function() {
    console.log("Reading JSON");

    var settings = {
        'cache': false,
        'dataType': "jsonp",
        "async": true,
        "crossDomain": true,
        "url": "https://catan-map-generator.herokuapp.com/api/map?jsonp=true",
        "method": "GET",
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.GameType);
        console.log(response.Board);
        drawMap(response.Board);
    });

});


function drawMap(data) {
    lineIndicators = ["a","b","c","d","e"];
    for (var i in lineIndicators) {
        indicator = lineIndicators[i];
        console.log("this is the line indicator: " + data[indicator]);
        for (var j = 0; j < data[indicator].length; j++) {
            var polygonId = indicator + j;
            var landscapeType = data[indicator][j].Landscape;
            var numberId = "n" + polygonId;
            var numberValue = data[indicator][j].Number.Number;
            console.log(polygonId);
            console.log(landscapeType);
            updatePolygon(polygonId,landscapeType);
            updateNumber(numberId,numberValue)
        }
    }  
}

function updatePolygon(polygonId,landscapeType) {
    var fillUpdate = getFillForLandscapeType(landscapeType);
    console.log("updating polygon id:"+polygonId+", to fill："+fillUpdate);
    $("#"+polygonId).attr('fill',fillUpdate);
}

function getFillForLandscapeType(landscapeType) {
    switch(landscapeType) {
        case 0: return "url(#desert)";
        break;
        case 1: return "url(#forest)";
        break;
        case 2: return "url(#pasture)";
        break;
        case 3: return "url(#field)";
        break;
        case 4: return "url(#river)";
        break;
        case 5: return "url(#mountain)";
        break;
    }
}

function updateNumber(numberId,numberValue) {
    $("#"+numberId).text(numberValue);
}