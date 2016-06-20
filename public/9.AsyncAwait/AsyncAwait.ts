/**
 * Created by Ran.Wahle on 6/20/2016.
 */
(function() {
    async function getUserAndChildren() {
        let users = await getUsers();
        users.forEach(user => {
            document.getElementById('parent').innerHTML += 'Name: ' + user.name + ' Last Name: ' + user.lastName + '</br>';
        });
        let children = await getFirstUserChildren();
        children.forEach(child => {
            document.getElementById('children').innerHTML += 'Name: ' + child.name + ' Last Name: ' + child.lastName + '<br/>';
        });

    }

    function getUsers() {
        let fetchPromise = fetch('/users').then(response => response.json());

        return fetchPromise;
    }

    function getFirstUserChildren() {
        return fetch('/users/1/children').then(response => response.json());
    }

    document.addEventListener('DOMContentLoaded',
        () => {let usersAndChildren = getUserAndChildren()});

})();