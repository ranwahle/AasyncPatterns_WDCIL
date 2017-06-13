var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); })
                .then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };



(function () {

   // function ajax(options) {

    //     function Promise() {
    //         this.successCallbacks = [];
    //         this.failCallbacks = [];
    //         this.finalCallbacks = [];
    //     }
    //
    //     Promise.prototype.then = function (successCallback, failCallback) {
    //         if (this.response || this.errorResponse){
    //             runCallbacks(successCallback, failCallback);
    //         }
    //         else {
    //             if (successCallback) {
    //                 this.successCallbacks.push(successCallback);
    //             }
    //             if (failCallback) {
    //                 this.failCallbacks.push(failCallback);
    //             }
    //         }
    //
    //         return this;
    //     };
    //
    //     Promise.prototype.finally = function (finalCallback) {
    //         if (finalCallback) {
    //             this.finalCallbacks.push(finalCallback);
    //         }
    //         return this;
    //
    //     };
    //
    //     Promise.prototype.resolve = function (data) {
    //         this.response = data;
    //         this.successCallbacks.forEach(function (callback) {
    //             callback(data);
    //         });
    //         runFinalCallbacks(this);
    //     };
    //
    //     Promise.prototype.reject = function (error) {
    //         this.errorResponse = error;
    //         this.failCallbacks.forEach(function (callback) {
    //             callback(error);
    //         });
    //         runFinalCallbacks(this);
    //     };
    //
    //     function runCallbacks(successCallback, errorCallback){
    //         if (this.response){
    //             successCallback(this.response);
    //         }
    //         else{
    //             errorCallback(this.errorResponse);
    //         }
    //     }
    //
    //     function runFinalCallbacks(promise) {
    //         promise.finalCallbacks.forEach(function (callback) {
    //             callback();
    //         });
    //     }
    //
    //
    //     var promise = new Promise();
    //
    //     var xhr = new XMLHttpRequest();
    //
    //     xhr.open(options.method || 'get',
    //         options.url, true);
    //
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //             promise.resolve(JSON.parse(xhr.response));
    //         }
    //         else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
    //             promise.reject(xhr.response);
    //         }
    //         else {
    //             console.log(xhr.readyState);
    //         }
    //     };
    //
    //
    //     xhr.send();
    //
    //     return promise;
    //
    //
    // }

    function* makeIterator(collection){
        for (let index = 0; index < collection.length; index++){
            yield collection[index];
        }

    }

    document.addEventListener('DOMContentLoaded', function () {

        return __awaiter(this, void 0, void 0, function*() {
            let messagesResponse = yield  fetch( '/allmessages');
            let messages = yield messagesResponse.json();
            messages.forEach(message => {
                if (message){
                    document.getElementById('chatContent').innerHTML += message.message + '</br/>';
                }
            });
        }  );

       // var fetchPromise =  fetch( '/allmessages').then(function(response) {
       //      console.log(response);
       //      return response;
       //  });
       //  fetchPromise.then( (response) => {
       //      response.json().then((messages) => {
       //         let messagesIterator  = makeIterator(messages);
       //          let current =  messagesIterator.next();
       //          do {
       //
       //              if (current.value){
       //                  document.getElementById('chatContent').innerHTML += current.value.message + '</br/>';
       //              }
       //              current =  messagesIterator.next();
       //          }while(!current.done);
       //
       //      });
       //  }, function (error) {
       //      console.error(error);
       //  });

        Promise.all([fetchPromise]).then(function(value){
            console.log('Fetch has resolved');
            document.getElementById('chatContent').innerHTML += 'End of past messages </br/>';
        });
    });

}());