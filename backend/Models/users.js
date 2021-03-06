const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

const schema = new mongoose.Schema({
    username: 'string',
    password: 'string',
    aboutMe: 'string',
    ldislikes: 'string',
    avatar: 'string',
    friendList: [{ userId: Number, username: String, loggedIn: { type: Boolean, Default: false } }],
    friendRequests: [{ userid: Number, username: String }],
    loc: {
        type: { type: String },
        coordinates: [Number],
    }
});

schema.index({ "loc": "2dsphere" });

const User = mongoose.model('User', schema);


mongoose.connect('mongodb://localhost/fm');

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, 'User');

exports.CreateUser = function(_username, _password, _aboutMe, _ldislikes, _loc) {
    var user = new User({
        "username": _username,
        "password": _password,
        "aboutMe": _aboutMe,
        "ldislikes": _ldislikes,
        "loc": {
            "type": "Point",
            "coordinates": [_loc.lon, _loc.lat]
        }
    });
    user.save(function(err) {
        if (err)
            return err;
        //console.log("there was an error: "+err);
        //saved!
        //console.log("saved user")
    });
}

exports.FindUser = function(_username, _password) {
    return User.findOne({ username: _username }, function(err, user) {
        if (err) return err;
        return user;
    }).then(function(result) {
        return result;
    }, function(err) {
        return err;
    });
}

exports.FindAllOtherUsers = function(userid) {
    return User.find({ _id: { $ne: userid } });
}

exports.searchUsersByDistance = function(userid, dist, loc) {
    // credit https://stackoverflow.com/questions/32199658/create-find-geolocation-in-mongoose
    return User.aggregate(
        [{
            "$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": [loc.lon, loc.lat]
                },
                "distanceField": "distance",
                "spherical": true,
                "maxDistance": dist * 1609.34,
                "query": { "_id": { "$ne": userid } }
            }
        }],
        function(err, results) {
            return err;
        }
    )
}

exports.FindUserCheckPassword = function(_username, _password) {
    /*return User.findOne({username:_username,password:_password}).then(result=>result).catch("there was an error");*/
    return User.findOne({ username: _username, password: _password }).then((result) => { if (result.password == _password) { return result } else { return false } }).catch((err) => { return false });
}

exports.DeleteAll = function() {
    User.remove({}, function() {});
}

exports.FindFriendsForUser = function(_userid) {
    //console.log("userid: "+_userid);
    return User.findOne({ _id: _userid }).then(function(user) {
        if (!user)
            return {};
        return user.friendList;
    }).catch((err) => console.log(err));
}

exports.AddFriendForUser = function(userid, fuserId) {
    return User.findOne({ _id: fuserId }).then(user => {
        return User.update({ _id: userid }, { $push: { friendList: { userId: fuserId, username: user.username, loggedIn: false } } });
    });
}

exports.ShowPublicInformationForUser = function(userid) {
    return User.findOne({ _id: userid });
}

// userId is the user that requested the friendship
exports.CreateFriendRequest = function(destinationId, userId, username) {
    return User.update({ _id: destinationId }, { $push: { friendRequests: { userid: userId, username: username } } });
}

exports.DeleteFriendRequest = function(sessionUserId, userId) {
    console.log("deleting friend request from " + userId);
    return User.update({ _id: sessionUserId }, { $pull: { friendRequests: { userid: userId } } });
}

exports.GetFriendRequests = function(userId) {
    return User.findOne({ _id: userId }).then(function(err, user) {
        if (err)
            return err;
        return user.friendRequests;
    });
}

exports.AddAvatar = function(userId, avatar) {
    return User.update({ _id: userId }, { avatar: avatar });
}

exports.GetAvatarForUser = function(userId) {
    try {
        return User.findOne({ "_id": userId }).then((user) => {
            if (user)
                return user.avatar;
            else
                return "";
        });
    } catch (err) {
        return err;
    }
}