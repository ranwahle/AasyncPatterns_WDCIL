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
            if (this.response || this.errorResponse){
                runCallbacks(successCallback, failCallback);
            }
            else {
                if (successCallback) {
                    this.successCallbacks.push(successCallback);
                }
                if (failCallback) {
                    this.failCallbacks.push(failCallback);
                }
            }

            return this;
        };

        Promise.prototype.finally = function (finalCallback) {

            if (finalCallback) {
                if (this.response || this.errorResponse){
                    setTimeout(finalCallback, 0);
                }
                this.finalCallbacks.push(finalCallback);
            }
            return this;

        };

        Promise.prototype.resolve = function (data) {
            this.response = data;
            this.successCallbacks.forEach(function (callback) {
                callback(data);
            });
            runFinalCallbacks(this);
        };

        Promise.prototype.reject = function (error) {
            this.errorResponse = error;
            this.failCallbacks.forEach(function (callback) {
                callback(error);
            });
            runFinalCallbacks(this);
        };

        function runCallbacks(successCallback, errorCallback){
            if (this.response){
                successCallback(this.response);
            }
            else{
                errorCallback(this.errorResponse);
            }
        }

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
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                promise.resolve(JSON.parse(xhr.response));
            }
            else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
                promise.reject(xhr.response);
            }
            else {
                console.log(xhr.readyState);
            }
        };


        xhr.send();

        return promise;


    }

    document.addEventListener('DOMContentLoaded', function () {
        ajax({url: '/allmessages'}).then(function (response) {
            console.log(response);
        }).then(function (response) {
            response.forEach(function (message) {
                document.getElementById('chatContent').innerHTML += message.message + '</br/>';
            });
        }, function (error) {
            console.error(error);
        }).finally(function () {
            document.getElementById('chatContent').innerHTML += 'End of past messages </br/>';
        });
    });

}());