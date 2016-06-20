/**
 * Created by Ran.Wahle on 6/20/2016.
 */
function* getUserAndChildren() {
    let users = yield getUsers();

     yield getFirstUserChildren();

}

function getUsers() {
    return fetch('/users').then(response=> response.json());

}

function getFirstUserChildren() {
    return fetch('/users/1/children').then(response => response.json());
}
document.addEventListener('DOMContentLoaded', () => {
    let usersAndChildren = getUserAndChildren();

    let promises = [];
    let current = usersAndChildren.next();

    do {
        console.log(current.value);
        promises.push(current);
        current = usersAndChildren.next();


    } while (!current.done);

    Promise.all(promises).then(promises =>
        promises.forEach(promise => {
            console.log('promise', promise);
            promise.value.then(response => console.log(response));
        })
    );
    
// let users = Promise.resolve( usersAndChildren.next().value);
// users.forEach(user => {
//     document.getElementById('parent').innerHTML += 'Name: ' + user.name + ' Last Name: ' + user.lastName + '</br>';
// });
//
// // while (usersAndChildren.next())
// // {
// //
// // };
console.log(usersAndChildren);


})
;