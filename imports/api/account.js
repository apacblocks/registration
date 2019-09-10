import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'verifyQRcode'(data) {
    console.log(data)
    return true
  },
  updateUser: (userData) => {
    check(userData, {
      btcAddress: Match.Where((address) => {
        check(address, String);
        return address.length > 0
      }),
      telegram: Match.Maybe(String),
      bio: Match.Maybe(String),
    });

    if (Meteor.userId()) {
      const userId = Meteor.userId();

      return Meteor.users.update(userId, {
        $set: {
          username: userData.btcAddress,
          profile: userData
        }
      });
    } else {
      throw new Meteor.Error('Error', 'You have to be logged in')
    }
  }
});