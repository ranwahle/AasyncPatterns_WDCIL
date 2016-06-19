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


            var promise = new Promise();
            
            var xhr = new XMLHttpRequest();

            xhr.open(options.method || 'get',
                options.url, true);

            xhr.onreadystatechange = function () {

            };

            xhr.send();


        }

        document.addEventListener('DOMContentLoaded', function () {
            ajax({url: '/allmessages'});
        });

    }
    ()
)
;