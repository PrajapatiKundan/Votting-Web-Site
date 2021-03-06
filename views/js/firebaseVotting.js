function addSeries() {

    
    var database = firebase.database();
    var seriesRef = database.ref('/series');
    var seriesInput = document.getElementById('addSeries');
    var seriesName = seriesInput.value;
    seriesInput.value = '';
    if (seriesName != "") {
        firebase.auth().onAuthStateChanged(function (user){
            if(!user){
                window.alert('Please Sign In First');
            }
        })
        seriesRef.push({
            name: seriesName,
            votes: 0
        })
        .then(function () {
            window.location.reload();
        })
        .catch(function (error) {

        })

    } else {
        window.alert("Enter the series");
    }

}

function upvote(key) {

    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var displayName = user.displayName;

    //var restaurantVotesRef = database.ref('/restaurants/' + key + '/votes/' + userId);
    var seriesVotesRef = database.ref('/series/')
        .child(key)
        .child('/votes')
        .child(userId);


    seriesVotesRef.push(displayName)
        .then(function () {
            window.location.reload();
        })
        .catch(function (error) {


        })
}

function downvote(key) {

    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var displayName = user.displayName;

    var seriesVotesRef = database.ref('/series/')
        .child(key)
        .child('/votes')
        .child(userId)
        .remove()
        .then(function () {
            window.location.reload();
        })
        .catch(function (error) {

        });

}