import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import { renderRoutes } from '../imports/startup/client/routes.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
