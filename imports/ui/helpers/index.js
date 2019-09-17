import { Meteor } from "meteor/meteor";
import moment from "moment";
import { MAX_NUM_INVITES } from "../constants";

export const userInvites = (user) => {
    if (user.invites) return user.invites;

    const inviteCount = Meteor.users.find({ "profile.invitedBy" : user._id }).count();
    return (MAX_NUM_INVITES - inviteCount);
}

export const formatDateTime = (date) => {
    return !date ? "" : moment(date).format("MMMM Do, YYYY");
}