import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

export const Tasks = new Mongo.Collection('tasks');
 
Meteor.methods({
  'verifyQRcode'(data) {
    console.log(data)
    return true
  },
});