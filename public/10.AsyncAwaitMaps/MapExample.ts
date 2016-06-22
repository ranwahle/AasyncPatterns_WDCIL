/**
 * Created by ranwahle on 23/02/2016.
 */

class GeoLocation {


    getCurrntPosition() {

        var promise = new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('Your browser doesn\'t support geo location');
            }
            else {

                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                });
            }


        });

        return promise;
    }

    getCityByLatLng(latlng) {
        var promise = new Promise((resolve, reject) => {

            
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        resolve(results[1].formatted_address);

                    }
                    else {
                        reject('error in results');
                    }
                }
                else
                    reject('Couldn\'t reverse geocode');
            });
        });

        return promise;
    }
}


(function () {


    async function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 6
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        var geoLocation = new GeoLocation();
        var pos = await geoLocation.getCurrntPosition();

        map.setCenter(pos);
        infoWindow.setPosition(pos);
        var address = await geoLocation.getCityByLatLng(pos);

        infoWindow.setContent('You are in ' + address);



    }


    document.addEventListener('DOMContentLoaded', ()=> initMap());
}());