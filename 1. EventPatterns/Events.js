/**
 * Created by ranwahle on 15/06/2016.
 */
(function(){

    function publisher(){
        this.topics = {};


    }

    publisher.prototype.addEventListener = function(eventName, callback){

        if (!this[eventName]){
            this[eventName] = [];
        }
        this[eventName].push(callback);

    };

    publisher.prototype.removeEventListener = function(eventName, callback){
      if (!this[eventName]){
          return;
      }
        var index = this[eventName].indexOf(callback);
        if (index >= 0){
            this[eventName].splice(index);
        }
    };

    publisher.prototype.fireEvent = function(eventName, eventArgs){
        if (!this[eventName]){
            return;
        }

        this[eventName].forEach(function(callback){
           callback(eventArgs);
        });
    };


    document.addEventListener('DOMContentLoaded', function(){
        document.querySelectorAll('.subscriber').forEach(function(element){
            element.textContent = 'Add Event Listener';
        })
    });



}());