/**
 * Created by ranwahle on 23/02/2016.
 */

class GeoLocation {


    getCurrntPosition() {

        var promise = new Promise((resolve, reject) => {
            if (!window.navigator.geolocation) {
                reject('Your browser doesn\'t support geo location');
            }
            else {

                window.navigator.geolocation.getCurrentPosition(function (position) {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                });
            }


        });

        return promise;
    }

    async getCityByLatLng(latlng) {
        //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&apiKey=AIzaSyAbafFmWKjOF1l1S8aQCQLvzmIDjpE_ulU`;
        //const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&apiKey=AIzaSyAbafFmWKjOF1l1S8aQCQLvzmIDjpE_ulU`;
        const result = await fetch(url);
        const location  = await result.json();
        console.log('location result', location, latlng);
        if (location.status === 'OK' && location.results[1] ) {
            return location.results[1].formatted_address;
        } else {
            throw('Error in resuls');
        }
        // var promise = new Promise((resolve, reject) =>
        //
        //     var geocoder = new google.maps.Geocoder;
        //     geocoder.geocode({'location': latlng}, function (results, status) {
        //         if (status === google.maps.GeocoderStatus.OK) {
        //             if (results[1]) {
        //                 resolve(results[1].formatted_address);
        //
        //             }
        //             else {
        //                 reject('error in results');
        //             }
        //         }
        //         else
        //             reject('Couldn\'t reverse geocode');
        //     });
        // });
        //
        // return promise;
    }
}



(function () {


    async function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 6
        });
        const infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        const geoLocation = new GeoLocation();
        const pos = await geoLocation.getCurrntPosition();

        map.setCenter(pos);
        infoWindow.setPosition(pos);
        const address = await geoLocation.getCityByLatLng(pos);

        infoWindow.setContent('You are in ' + address);





    }


    document.addEventListener('DOMContentLoaded', ()=> initMap());
}());