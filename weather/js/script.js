$(function () {
    'use strict';

    var data = $('#data');

    $.get('://freegeoip.net/json/', function (result) {
        $('#location-form input[name="location"]').val(result.city);
        $('#location-form').trigger('submit');
    })


    $('#location-form').on('submit', function () {
        var location = this.elements['location'].value;
        var units = this.elements['units'].value;

        $.get('://api.openweathermap.org/data/2.5/weather?APPID=de2fc78f5109b4494d450fcf942fc04f&units=' + units + '&q=' + location, setupLocation);
        return false;
    });

    function setupLocation(result) {
        data.html("");
        if (result.cod !== 200) {
            data.append($('<div class="alert alert-warning"></div>').text(result.message))
            return false;
        }

        data.append($('<h3></h3>').text(result.name));
        data.append($('<div></div>').html(result.main.temp + '&deg;'));

        result.weather.forEach(function (weatherData) {
            data.append($('<h4></h4>').text(weatherData.main))
            data.append($('<i></i>').addClass('owf owf-3x owf-' + weatherData.id))
            console.log(weatherData);
        });
    }
});