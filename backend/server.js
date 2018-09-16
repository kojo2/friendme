const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./Models/users');
const conversations = require('./Models/conversations');
const sessions = require('./Models/sessions');
const webSocket = require('websocket');
const { validateLoc } = require('./validateLoc');
var expressSession = require('express-session');
const formidable = require('formidable');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs-extra');
const util = require('util');
const qt = require('quickthumb');
var mongoStore = require('connect-mongo')({ session: expressSession });
//const cors = require('cors');

const app = express();

//sessions.deleteAll();
//conversations.deleteAll();

//app.use(cors());

var WebSocketServer = webSocket.server;


//mongoose.connect('mongodb://localhost/fm');

//require('./Models/Users');


app.use(express.json());
app.use(qt.static(__dirname + '/'));

// set up body parser middlware

//app.use(bodyyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var sessionParser = expressSession({ store: new mongoStore({ mongooseConnection: mongoose.connection }), secret: 'dsjfaq3iojhgjhg5hj36jhgjh56khg53645jrmfsa', cookie: { maxAge: 60 * 60 * 1000 } });

app.use(sessionParser);


// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.post('/login/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    //console.log(username+" and "+password);

    users.FindUserCheckPassword(username, password).then(function(user) {
        if (user != false) {
            req.session.regenerate(function() {
                console.log("created a new session " + req.session.id);
                req.session.user = user.id;
                req.session.username = user.username;
                req.session.msg = 'Authenticated as ' + user.username;
                req.session.save();
                //console.log("user logged in is: "+req.session.user);
                res.send("true");
            });
        } else {
            //console.log("couldn't find user");
            res.send("false");
        }
        //console.log(user);
        //res.send(result);
    })
});


app.get('/friendsConvos', function(req, res) {
    //console.log(req.body.userid+" requested their friends list");	
    //console.log(req.session);
    let count = 0;
    users.FindFriendsForUser(req.session.user).then(function(friendList) {
        if (friendList) {
            let friendListArr = [];
            //console.log(friendList.length);
            for (let i = 0; i < friendList.length; i++) {
                let friend = {};
                friend.userId = friendList[i].userId;
                friend.username = friendList[i].username;
                friend.loggedIn = friendList[i].loggedIn;
                try {
                    users.GetAvatarForUser(friend.userId).then((avatar) => {
                        friend.avatar = avatar;
                        sessions.checkSession(friend.userId).then((result) => {
                            friend.loggedIn = result;
                            conversations.GetConversation(friend.userId, req.session.user).then((result2) => {
                                let lastMessage;
                                try {
                                    lastMessage = result2.messages[result2.messages.length - 1].message;
                                } catch (error) {
                                    lastMessage = "";
                                }
                                friend.lastMessage = lastMessage;
                                //console.log("friend was: " + result2);
                                try {
                                    friend.timeStamp = result2.updatedAt;
                                } catch (error) {
                                    friend.timeStamp = "";
                                }

                                //console.log(friend);
                                friendListArr.push(friend);
                                if (count == friendList.length - 1) {
                                    friendListArr.sort((a, b) => {
                                        return a.userId - b.userId
                                    });
                                    if (!res.headersSent) {
                                        res.send(friendListArr);
                                    }
                                }
                                count++;
                            });
                        });
                    });
                } catch (error) {
                    // continue the loop as the friend can't be found on the system
                    continue;
                }
            }
        } else {
            res.send("err");
        }
    });

});

app.post('/register/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var aboutMe = req.body.aboutMe;
    var ldislikes = req.body.ldislikes;
    var loc = req.body.loc;
    console.log(req.body);
    // if the location loc is a postcode then geocode it to a location using google 
    validateLoc(loc).then(function(loc) {
        // DEV line for delete all documents in users collection - Just faster than compass!
        if (username == "") {
            users.DeleteAll();
            console.log("deleted everything");
        } else {
            users.FindUser(username, password).then(
                function(result) {
                    if (!result) {
                        // if user doesn't already exist then create them
                        users.CreateUser(username, password, aboutMe, ldislikes, loc);
                        res.send("User created successfully");
                        console.log("sending User created successfully")
                    } else {
                        res.send("User already exists");
                        console.log("sending User already exists");
                    }
                },
                function(err) {
                    res.send("there was an unspecified error");
                    console.log("sending there was an unspecified error");
                });
        }
    })




});

app.get('/friends/add', function(req, res) {
    users.AddFriendForUser(req.session.id, req.body.fid).then(result => {
        users.DeleteFriendRequest(req.session.user, req.body.fid);
    })
});

app.get('/session', function(req, res) {
    //console.log(req.session.id);
    res.send(req.session.id);
});

app.post('/conversation', function(req, res) {
    var userid = req.body.userid;
    req.session.chatUser = userid;
    var userid2 = req.session.user;
    //check if a conversation already exists between these users
    //conversations.GetConversation(userid,userid2);
    conversations.CreateConversation(userid, userid2).then((conversation) => {
        if (conversation != null)
            res.send(conversation);
    })
});

app.post('/conversation/message', function(req, res) {
    var userid = req.body.userid;
    var userid2 = req.session.user;
    var message = req.body.message;
    conversations.AddMessage(userid, userid2, message).then((updatedConversation) => {
        //console.log(updatedConversation);
    });
});

app.get('/users', function(req, res) {
    users.FindAllOtherUsers(req.session.user).then(function(data) {
        //console.log(data);
        res.json(data);
    });
});

app.post('/search', function(req, res) {
    dist = req.body.distance;
    loc = req.body.position;
    validateLoc(loc).then(function(loc) {
        users.searchUsersByDistance(req.session.user, dist, loc).then(function(data) {
            res.json(data);
        });
    });


});

app.get('/user/:userid', function(req, res) {
    //console.log("trying to get profile for user id: "+req.params.userid);
    users.ShowPublicInformationForUser(req.params.userid).then(result => res.send(result));
});

app.post('/friendRequest', function(req, res) {
    users.CreateFriendRequest(req.body.userId, req.session.user, req.session.username).then(response => res.send(response));

});

app.post('/friendRequest/accept', function(req, res) {
    users.DeleteFriendRequest(req.session.user, req.body.userId);
    users.AddFriendForUser(req.body.userId, req.session.user);
    users.AddFriendForUser(req.session.user, req.body.userId);
    res.send("accepted friend!");
});

app.get('/friendRequests', function(req, res) {
    //console.log(req.session);
    if (req.session.user)
        users.GetFriendRequests(req.session.user).then(response => res.json(response.friendRequests))
});

app.get('/logout', function(req, res) {
    console.log("now destroying session " + req.session.id);
    req.session.destroy();
    res.send("sucess");
});

app.post('/upload', function(req, res) {
    if (!req.session) {
        res.send("You must be logged in to do this");
        console.log("user wasn't logged in");
    }
    users.AddAvatar(req.session.user, req.body.file).then((response) => {
        res.send(response);
        console.log("response was: " + response);
    });
});

app.get('/avatar', function(req, res) {
    users.GetAvatarForUser(req.session.user).then((avatar) => res.send(avatar));
});

//get('register','registering new user');


app.listen(8080);

console.log("app listening on 8080");

var randomWords = require('random-words');

//console.log(randomWords(10));


// websocket stuff

var WebSocketServer = webSocket.server;
var http = require('http');

var server = http.createServer(function(req, res) {

});

server.listen(1234, function() {});

wsServer = new WebSocketServer({
    httpServer: server
});

var connections = [];

var datetime = require('node-datetime');

wsServer.on('request', function(r) {

    sessionParser(r.httpRequest, {}, function() {
            // get the user details out of the session object hidden inside the httpRequest object
            let user = r.httpRequest.session.user;
            let username = r.httpRequest.session.username;
            // accept the connection
            var connection = r.accept('echo-protocol', r.origin);
            console.log("userid " + user + " connected to the websocket server");
            connection.send("connected");
            // add the connection to an array of connections so we can access it later
            connections.push({ connection: connection, userid: user });
            // when we get a message coming in...
            connection.on('message', function(packet) {
                // parse the message into a JSON object and save the variables
                let packetObj = JSON.parse(packet.utf8Data);
                let otherUser = packetObj.otherUser;
                let message = packetObj.message;
                // if the message is "initial" it means its the first message the client is sending us
                if (message == "initial") {
                    console.log("server received the initial message from the connected client");
                    console.log("now we must send back the conversation history");
                    // get conversation for these two user ids then send the result back to the client with the tag "initial"
                    let identifiers = {
                        ["userid" + user]: username,
                        ["userid" + otherUser]: packetObj.otherUsername
                    };
                    conversations.GetConversation(otherUser, user).then((conversation) => connection.sendUTF(JSON.stringify({ typ: "initial", conversation: conversation, identifiers: identifiers })));
                }
                // cycle through the connections to find the other person's connection so we can send the message to them
                connections.forEach((c) => {
                    if (c.userid == otherUser) {
                        // loop through the connections and if the users match its the right conversation, so send the message to all concerned
                        c.connection.sendUTF(dt + ":" + username + " says: " + message);
                        console.log("sending message from userid: " + user + " to userid: " + otherUser);
                        console.log("the message is: " + message);
                        console.log("found userid " + otherUser + " at id: " + c.userid + "!");
                    } else {
                        console.log("couldn't find user with id: " + otherUser);
                    }
                });


            });
        })
        //

});