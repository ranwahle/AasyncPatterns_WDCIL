/**
 * Created by ranwahle on 19/06/2016.
 */
(function () {

    // function ajax(options) {
    //
    //     function Promise() {
    //         this.successCallbacks = [];
    //         this.failCallbacks = [];
    //         this.finalCallbacks = [];
    //     }
    //
    //
    //
    //
    //     xhr.send();
    //
    //     return promise;
    //
    //
    // }

    document.addEventListener('DOMContentLoaded', function () {
       var jsonPromise, fetchPromise =  fetch( '/allmessages')
           .then(function(response) {
            console.log(response);
            return response;
        }).then(function (response) {
               return response.json().then(function(messages) {
                messages.forEach(function (message) {
                    document.getElementById('chatContent').innerHTML += message.message + '</br/>';
                });

            });
        }, function (error) {
            console.error(error);
        });

        Promise.all([fetchPromise,fetchPromise.chain])
            .then(function(){
            console.log(fetchPromise,fetchPromise.chain);
            console.log('Fetch has been resolved');
            document.getElementById('chatContent').innerHTML += 'End of past messages </br/>';
        });
    });

}());