/**
 * Created by ranwahle on 19/06/2016.
 */
(function(){

    function ajax(options){

        var xhr = new XMLHttpRequest();

        xhr.open( options.method || 'get',
                  options.url, true);

        xhr.onreadystatechange = function(){
            
        };

        xhr.send();





    }

    document.addEventListener('DOMContentLoaded',function(){
        ajax({url: '/allmessages'});
    });

}());