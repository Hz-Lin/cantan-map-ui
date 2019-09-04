
var $loading = $('#loadingDiv').hide();
$(document)
    .ajaxStart(function () {
        $loading.show();
    })
    .ajaxStop(function () {
        $loading.hide();
    });

$( "#sendAlertButton" ).click(function() {
    alert( "Handler for .click() called." );
});

$( "#generateMapCodeButton" ).click(function() {
    code = $('#gameCodeInput').val();
    console.log("Code: ", code)
    var settings = {
        'cache': false,
        'dataType': "jsonp",
        "async": true,
        "crossDomain": true,
        "url": "https://catan-map-generator.herokuapp.com/api/map/code/"+code+"?jsonp=true",
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
        updateGamecode(response.GameCode, response.GameType);
        drawMap(response.GameType, response.Board);
    });

});

$( "#generateMap4Button" ).click(function() {
    console.log("Reading JSON");

    var settings = {
        'cache': false,
        'dataType': "jsonp",
        "async": true,
        "crossDomain": true,
        "url": "https://catan-map-generator.herokuapp.com/api/v1/map?jsonp=true",
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
        updateGamecode(response.GameCode, response.GameType);
        drawMap(response.GameType, response.Board);
    });

});

$( "#generateMap6Button" ).click(function() {
    console.log("Reading JSON");

    var settings = {
        'cache': false,
        'dataType': "jsonp",
        "async": true,
        "crossDomain": true,
        "url": "https://catan-map-generator.herokuapp.com/api/map?type=large&max=365&min=156&minr=65&maxr=140&max300=22&jsonp=true",
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
        updateGamecode(response.GameCode, response.GameType);
        drawMap(response.GameType, response.Board);
    });

});

function drawMap(type,data) {
    if (type === "Normal") {
        lineIndicators = ["a","b","c","d","e"];
        idPrefix = "s";
    } else {
        lineIndicators = ["a","b","c","d","e","f","g"];
        idPrefix = "l";
    };
    for (var i in lineIndicators) {
        indicator = lineIndicators[i];
        console.log("this is the line indicator: " + data[indicator]);
        for (var j = 0; j < data[indicator].length; j++) {
            var polygonId = idPrefix + indicator + j;
            var landscapeType = data[indicator][j].Landscape.Name.toLowerCase();
            var numberId = idPrefix + "n" + indicator + j;
            var numberValue = data[indicator][j].Number.Number;
            console.log(polygonId);
            console.log(landscapeType);
            console.log(numberId);
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
    return "url(#"+landscapeType+")";
}

function updateNumber(numberId,numberValue) {
    $("#"+numberId).text(numberValue);
}

function updateGamecode(gameCode, gameType) {
    $('div.gameCode'+gameType+' .value').text(gameCode);
}

