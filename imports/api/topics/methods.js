import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Topic } from './topics';

export const proposeTopic = new ValidatedMethod({
    name: 'proposeTopic',
    validate: new SimpleSchema({
        title: {
            type: String,
            min: 1,
            max: 70,
            optional: false
        },
        summary: {
            type: String,
            min: 1,
            max: 500,
            optional: false
        },
        details: {
            type: String,
            min: 1,
            max: 160,
            optional: false
        }
    }).validator(),
    run({ title, summary, details }) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Error.', 'You have to be logged in!')
        }

        return Topic.insert({
            title: title,
            summary: summary,
            details: details,
            createdAt: new Date().getTime(),
            createdBy: Meteor.userId(),
            updatedAt: new Date().getTime(),
        });
    }
});