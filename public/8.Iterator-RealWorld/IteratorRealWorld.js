/**
 * Created by Ran.Wahle on 6/20/2016.
 */
function* getUserAndChildren(){
    var users = getUsers();
    yield  users;
    yield getFirstUserChildren();
}

function getUsers(){
    var fetchPromise =  fetch( '/users');

    return fetchPromise;
}

function getFirstUserChildren(){
    return fetch('/users/1/children');
}

var usersAndChildren = getUserAndChildren();

console.log(usersAndChildren);