const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

const conversationSchema = new mongoose.Schema({ userid: 'string', userid2: 'string', messages: [{ userId: Number, message: String, otherName: String }] }, { timestamps: true });
const Conversation = mongoose.model('Conversation', conversationSchema);




mongoose.connect('mongodb://localhost/fm');

autoIncrement.initialize(mongoose.connection);
conversationSchema.plugin(autoIncrement.plugin, 'Conversation');

exports.CreateConversation = function(userid, userid2) {
    // first we check if a conversation already exists between these two users
    return this.GetConversation(userid, userid2).then((conversation) => {
        if (conversation == null) {
            var conversation = new Conversation({ "userid": userid, "userid2": userid2 });
            conversation.save(function(err) {
                if (err)
                    return err;
            });
        } else {
            return conversation;
        }
    });
}

exports.GetConversation = function(userid, userid2) {
    return Conversation.findOne({ userid: userid, userid2: userid2 }).then((result1) => {
        return Conversation.findOne({ userid: userid2, userid2: userid }).then((result2) => {
            if (result1 != null)
                return result1;
            if (result2 != null)
                return result2;
        });
    });
}

exports.deleteAll = function() {
    Conversation.remove({}, function() {});
}

exports.AddMessage = function(userid, userid2, message) {
    var datetime = require('node-datetime');
    var dt = datetime.create();
    var timeFormatted = dt.format('m/d/Y H:M:S');
    return this.GetConversation(userid, userid2).then((conversation) => {

        var blob = { message: message, userId: userid, time: timeFormatted };
        return Conversation.update({ _id: conversation._id }, { $push: { messages: blob } });
    });

}