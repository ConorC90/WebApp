  

var app = new Vue({
                el: "#app",
                data: {
                    "table": [],
                    "name": [],
                    "view": "home",
                    "playedGames": [],
                    "futureGames": [],
                    "maps": [],
                    clubs: data.clubs,
                    fixtures: data.season_fixtures,
                },
                methods: {

                    giveMeThePlayers(teamName) {
                        return data.players.filter(player => player.current_club == teamName)
                    },
//                    giveMeTheMatchDays(dayOfMatch){
//                        return data.season_fixtures.filter(games => games.matchday == dayOfMatch)
//                    }
//                    
                    orderByPosition() {
                        //    "[...]" makes a new copy of an array
                        var sortPosition = [...app.clubs].sort((a, b) => {
                            return a.position - b.position
                        })
                        app.table = sortPosition
                        return sortPosition
                    },
                    pastGames() {
                        var compleatedGames = [];
                        for (var i = 0; i < allGames.length; i++) {
                            allGames[i].fixtures.forEach(game => {
                                if (game.status == "FT") {
                                    compleatedGames.push(game);
                                }
                            })
                        }
                        app.playedGames = compleatedGames
                        return compleatedGames;
                    },
                    futureGames1() {
                        var uncompleatedGame = [];

                        for (var i = 0; i < allGames.length; i++) {
                            allGames[i].fixtures.forEach(game => {
                                if (!game.status) {
                                    uncompleatedGame.push(game);
                                }
                            })
                        }
                        app.futureGames = uncompleatedGame
                        return uncompleatedGame;
                    },
                    login() {
                        // https://firebase.google.com/docs/auth/web/google-signin
                        //Provider
                        var provider = new firebase.auth.GoogleAuthProvider();
                        //How to signin
                        firebase.auth().signInWithPopup(provider)
                            // to push message in the app after connect

                            .then(function (result) {
                                if (result.credential) {
                                    getPosts()
                                    getPosts1()
                                }
                            }).catch(console.log("error"))
                        console.log("login")
                    },
                    logout() {
                        firebase.auth().signOut().then(function () {
                            // Sign-out successful.
                        }, function (error) {
                            // An error happened.
                        });
                        document.getElementById("posts1").style.display = "none"
                        document.getElementById("posts").style.display = "none"

                    },
                    writeNewPost() {
                        // https://firebase.google.com/docs/database/web/read-and-write
                        //Values from HTML
                        var text = document.getElementById("textInput").value;
                        var name = firebase.auth().currentUser.displayName;
                        var dateStamp = new Date();
                        var timeStamp = new Date();

                        var objectToSend = {
                            author: name,
                            message: "''" + text + "''",
                            hello: " " + timeStamp.toLocaleTimeString() + " " + dateStamp.toDateString(),
                        }
                        firebase.database().ref("chatMessages").push(objectToSend);;
                        console.log(objectToSend);
                        document.getElementById("textInput").value = ''
                        chatScroll()
                        // Values
                        console.log("write");
                    },
                    writeNewPost1() {
                        // https://firebase.google.com/docs/database/web/read-and-write
                        //Values from HTML
                        var text = document.getElementById("textInput1").value;
                        var name = firebase.auth().currentUser.displayName;
                        var dateStamp = new Date();
                        var timeStamp = new Date();
                        var objectToSend = {
                            author: name,
                            message: "''" + text + "''",
                            hello: " " + timeStamp.toLocaleTimeString() + " " + dateStamp.toDateString(),
                        }
                        firebase.database().ref("chatMessages1").push(objectToSend);;
                        console.log(objectToSend);

                        document.getElementById("textInput1").value = ''
                        chatScroll1()
                        // Values
                        console.log("write");

                    },








                }

            });
var allGames = app.fixtures
            var allPlayers = data.players
            var allClubs = data.clubs

            app.orderByPosition()



          


            function getPosts() {

                //Get messages

                firebase.database().ref("chatMessages").on('value', function (data) {
                    var posts = document.getElementById("posts");
                    posts.innerHTML = "";
                    console.log(data.val());
                    var messages = data.val();
                    for (var key in messages) {
                        var text = document.createElement("div");
                        
                        var element = messages[key];
                        
                        var node = document.createElement("p");
                        var node3 = document.createElement("p");
                        var node2 = document.createElement("p");

                        node.append(element.author);
                        node2.append(element.message);
                        node3.append(element.hello);

                        text.append(node, node3, node2);

                        //         var textnode = 
                        posts.append(text);
                        
                        if (element.author == firebase.auth().currentUser.displayName) {
                       text.classList.add("chatBox")
                   } else {
                       text.classList.add("chatBox1")
                   }
                        

                        //            node.appendChild(textnode);
                        //            document.getElementById("posts").appendChild(node);
                    }
                })

                console.log("getting posts");

            }


            function chatScroll() {
                document.getElementById("posts").scrollTop = document.getElementById("posts").scrollHeight
            }

            function chatScroll1() {
                document.getElementById("posts1").scrollTop = document.getElementById("posts1").scrollHeight
            }



//
//            document.getElementById("create-post1").addEventListener("click", writeNewPost1);



            //            function


            function getPosts1() {

                //Get messages

                firebase.database().ref("chatMessages1").on('value', function (data) {
                    var posts = document.getElementById("posts1");
                    posts1.innerHTML = "";
                    console.log(data.val());
                    var messages = data.val();
                    for (var key in messages) {
                        var text = document.createElement("div");
                        var element = messages[key];
                        var node = document.createElement("p");
                        var node2 = document.createElement("p");
                        var node3 = document.createElement("p");

                        node.append(element.author);
                        node2.append(element.message);
                        node3.append(element.hello);

                        text.append(node, node3, node2);

                        //         var textnode = 
                        posts1.append(text);
                        console.log (element.author)
                        
                            if (element.author == firebase.auth().currentUser.displayName) {
                       text.classList.add("chatBox")
                   } else {
                       text.classList.add("chatBox1")
                   }

                        //            node.appendChild(textnode);
                        //            document.getElementById("posts").appendChild(node);
                    }
                })

                console.log("getting posts");

            }

            //Chat js

//            document.getElementById("login").addEventListener("click", login);
//
//            document.getElementById("logout").addEventListener("click", logout);
//
//
//            document.getElementById("create-post").addEventListener("click", writeNewPost);

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                } else {
                    // No user is signed in.
                }
            });
