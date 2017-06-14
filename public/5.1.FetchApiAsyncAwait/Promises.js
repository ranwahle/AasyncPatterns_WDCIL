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

    document.addEventListener('DOMContentLoaded',  async () => {
        try {
            const response = await fetch('/allmessages');

            console.log(response);


            const messages = await response.json();
            messages.forEach( (message) => {
                document.getElementById('chatContent').innerHTML += message.message + '</br/>';
            });


        } catch (error) {
            console.error(error);
        }

        /* promise all */


        console.log('Fetch has been resolved');
        document.getElementById('chatContent').innerHTML += 'End of past messages </br/>';

    });

}());