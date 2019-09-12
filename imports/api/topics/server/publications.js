import { Meteor } from "meteor/meteor";
import { Topic } from "../topics";
import { publishComposite } from 'meteor/reywood:publish-composite';


publishComposite('topics', {
    find() {
        return Topic.find();
    },
    children: [
        {
            find(topic) {
                return Meteor.users.find({ _id: topic.createdBy })
            }
        }
    ]
});
