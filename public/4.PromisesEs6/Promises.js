/**
 * Created by ranwahle on 19/06/2016.
 */
(function () {

    function ajax(options) {




        var promise = new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();

            xhr.open(options.method || 'get',
                options.url, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                }
                else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
                    reject(xhr.response);
                }
                else {
                    console.log(xhr.readyState);
                }
            };


            xhr.send();

        });

        return promise;


    }

    document.addEventListener('DOMContentLoaded', function () {
        var promise = ajax({url: '/allmessages'});
        console.log(promise);

        promise.then(function (response) {
            console.log(response);
        });
            promise.then(function (response) {
                console.log('promise', promise);
                response.forEach(function (message) {
                    document.getElementById('chatContent').innerHTML += message.message + '</br/>';
                });
            }, function (error) {
                console.error(error);
            }
        );

        let promise2 = ajax({url: '/allmessages2'});

        Promise.all([promise, promise2]).then(function(){
            console.log('promise1', promise, 'promise2', promise2);
            document.getElementById('chatContent').innerHTML += 'End of past messages </br/>';
        }, function(){
            console.log('promise1', promise, 'promise2', promise2);
        });
        // }).finally(function () {
        //     document.getElementById('chatContent').innerHTML += 'End of past messages </br/>';
        // });
    });

}());