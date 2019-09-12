import '../imports/api/account'

// Topics imports
import '../imports/api/topics/topics'
import '../imports/api/topics/methods'
import '../imports/api/topics/server/publications'

import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

//The following is called whenever a new user is created.
//The _id of the sponsoring user (who is inviting a new member)
//should be added to the user's 'profile' object under the key 'invitedBy'.
Accounts.validateNewUser((user) => {
    if (!Meteor.isDevelopment) {
        if (!verifyTime()) {
            throw new Meteor.Error(403, 'You must be physically in attendance at an APAC Blocks event to become a membner.');
        }
        //Check if the invitedBy string inside the user's profile object is a valid user _id
        if (!Meteor.users.findOne({ _id: user.profile['invitedBy'] })) {
            return false
        }
        //Check if the sponsoring users still has invitations remaining (maximum of 2)
        if (!checkInviteLimit(user.profile['invitedBy'])) {
            throw new Meteor.Error(403, 'Your sponsor has no remaining invitations.');
        }
    }

    return true
});

function checkInviteLimit(id) {
    var invites = 0;
    Meteor.users.find({}).forEach(function (user) {
        if (user.profile['invitedBy'] == id) {
            invites++
        }
    })
    if (invites <= 1) {
        return true
    }
    return false
}
function verifyTime() {
    if ((1567774800000 - Date.now()) > 0) { return true }
    return false
}
Meteor.publish('userlist', () => Meteor.users.find({}))

Meteor.methods({
    getUsername(_id) {
        check(_id, String);
        return Meteor.users.findOne({ _id: _id }).profile.realName
    },
});

