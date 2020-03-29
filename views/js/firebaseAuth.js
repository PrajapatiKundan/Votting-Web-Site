function checkIfLoggedIn() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            
            document.getElementById('signInId')
                .setAttribute('style', 'display:none;visibility:hidden');
            document.getElementById('signOutId')
                .setAttribute('style', 'display:inline-block;visibility:visible');
        } else {
           
            document.getElementById('signInId')
                .setAttribute('style', 'display:inline-block;visibility:visible');
            document.getElementById('signOutId')
                .setAttribute('style', 'display:none;visibility:hidden');
        }
    });

}
window.onload = function () {
    checkIfLoggedIn();
}



function signOut() {
    firebase.auth().signOut();
    //checkIfLoggedIn();
}




function signInWithGoogle() {
    //checkIfLoggedIn();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (data) {
    
        var name = data.user.displayName;

    
        document.getElementById("name").innerHTML = name;

        document.getElementById('signInId')
            .setAttribute('style', 'display:none;visibility:hidden');
        document.getElementById('signOutId')
            .setAttribute('style', 'display:inline-block;visibility:visible');

        console.log(data);
    }).catch(function (error) {
        console.log(error);
    });
}
