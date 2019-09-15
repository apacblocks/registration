import { Meteor } from "meteor/meteor";
import moment from "moment";

export const userInvites = (user) => {
    if (user.invites) return user.invites;

    const invited = Meteor.users.find({ "profile.invitedBy" : user._id }).count();

    if (invited >= 2)  return  0;

    return invited;
}

export const formatDateTime = (date) => {
    return !date ? "" : moment(date).format("MMMM Do, YYYY");
}