import '../imports/api/account'

//The following is called whenever a new user is created.
//The _id of the sponsoring user (who is inviting a new member)
//should be added to the user's 'profile' object under the key 'invitedBy'.
Accounts.validateNewUser((user) => {
    //Check if the invitedBy string inside the user's profile object is a valid user _id
    if(!Meteor.users.findOne({_id: user.profile['invitedBy']})){return false}
    //Check if the sponsoring users still has invitations remaining (maximum of 2)
    if(!checkInviteLimit(user.profile['invitedBy'])) {
        throw new Meteor.Error(403, 'Your sponsor has no remaining invitations.');
    }
    return true
  });

  function checkInviteLimit(id) {
      var invites = 0;
      Meteor.users.find({}).forEach(function(user){
          if (user.profile['invitedBy'] == id) {
              invites++
          }
      })
      if (invites <= 1) {
        return true
      }
      return false   
  }
