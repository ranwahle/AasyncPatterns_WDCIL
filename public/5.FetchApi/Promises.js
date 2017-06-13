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

    document.addEventListener('DOMContentLoaded',  () => {
       const  fetchPromise =  fetch( '/allmessages')
           .then((response) => {
            console.log(response);
            return response;
        }).then( (response) => {
               return response.json().then(messages => {
                messages.forEach(message =>{
                    document.getElementById('chatContent').innerHTML += `${message.message}<br/>`;
                });

            });
        }, function (error) {
            console.error(error);
        });

        Promise.all([fetchPromise,fetchPromise.chain])
            .then(() => {
            console.log(fetchPromise,fetchPromise.chain);
            console.log('Fetch has been resolved');
            document.getElementById('chatContent').innerHTML += 'End of past messages </br/>';
        });
    });

}());