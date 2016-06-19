/**
 * Created by ranwahle on 19/06/2016.
 */
(function () {

    function ajax(options) {

        function Promise() {
            this.successCallbacks = [];
            this.failCallbacks = [];
            this.finalCallbacks = [];
        }

        Promise.prototype.then = function (successCallback, failCallback) {
            if (successCallback) {
                this.successCallbacks.push(successCallback);
            }
            if (failCallback) {
                this.failCallbacks.push(failCallback);
            }

            return this;
        };

        Promise.prototype.finally = function (finalCallback) {
            if (finalCallback) {
                this.finalCallbacks.push(finalCallback);
            }
            return this;

        };

        Promise.prototype.resolve = function (data) {
            this.successCallbacks.forEach(function (callback) {
                callback(data);
            });
            runFinalCallbacks(this);
        };

        Promise.prototype.reject = function (erorr) {
            this.failCallbacks.forEach(function (callback) {
                callback(erorr);
            });
            runFinalCallbacks(this);
        };

        function runFinalCallbacks(promise) {
            promise.finalCallbacks.forEach(function (callback) {
                callback();
            });
        }


        var promise = new Promise();

        var xhr = new XMLHttpRequest();

        xhr.open(options.method || 'get',
            options.url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                promise.resolve(JSON.parse( xhr.response));
            }
        };


        xhr.send();

        return promise;


    }

    document.addEventListener('DOMContentLoaded', function () {
        ajax({url: '/allmessages'}).then(function (response) {
            console.log(response);
        }).then(function(response){
            response.forEach(function(message){
                document.getElementById('chatContent').innerHTML +=  message.message + '</br/>';
            }, function(error){
                console.error(error);
            });
        }).finally(function(){
            document.getElementById('chatContent').innerHTML += 'End of past messages </br/>';
        });
    });

}());