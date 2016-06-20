/**
 * Created by Ran.Wahle on 6/20/2016.
 */
function* getUserAndChildren(){
    var users = getUsers();
    yield  users;
    yield getFirstUserChildren();
}

function getUsers(){
    return  fetch( '/users').then(response=> response.json());

}

function getFirstUserChildren(){
    return fetch('/users/1/children').then(response => response.json());
}

var usersAndChildren = getUserAndChildren();

console.log(usersAndChildren);