import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'verifyQRcode'(data) {
    console.log(data)
    return true
  },
  updateUser: ({ btcAddress, telegram, bio }) => {
    check(btcAddress, Match.Where((address) => {
      check(address, String);
      return address.length > 0
    }));
    check(telegram, Match.Maybe(String));
    check(bio, Match.Maybe(String));

    if (Meteor.userId()) {
      const userId = Meteor.userId();

      return Meteor.users.update(userId, {
        $set: {
          username: btcAddress,
          "profile.btcAddress": btcAddress,
          "profile.telegram": telegram,
          "profile.bio": bio,
        }
      });
    } else {
      throw new Meteor.Error('Error', 'You have to be logged in')
    }
  }
});