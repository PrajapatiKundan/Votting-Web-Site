function checkIfLoggedIn() {

    firebase.auth().onAuthStateChanged(function (user) {
        
        if (user) {
            //logged in
            var name = user.displayName
            document.getElementById("name").innerHTML = name;
            document.getElementById('signInId')
                .setAttribute('style', 'display:none;visibility:hidden');
            document.getElementById('signOutId')
                .setAttribute('style', 'display:inline-block;visibility:visible');
        
        } else {
           //not logged in
            document.getElementById('signInId')
                .setAttribute('style', 'display:inline-block;visibility:visible');
            document.getElementById('signOutId')
                .setAttribute('style', 'display:none;visibility:hidden');
            document.getElementById('name').innerHTML = "";
        }
    
    });

}

window.onload = function () {
    checkIfLoggedIn();
}

function signOut() {
    firebase.auth().signOut();

}

function signInWithGoogle() {
    
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (data) {
    
        var name = data.user.displayName;

        document.getElementById("name").innerHTML = name;
        document.getElementById('signInId')
            .setAttribute('style', 'display:none;visibility:hidden');
        document.getElementById('signOutId')
            .setAttribute('style', 'display:inline-block;visibility:visible');

    }).catch(function (error) {

    });
}
