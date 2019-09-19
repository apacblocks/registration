import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import QrReader from 'react-qr-reader'
import { Meteor } from 'meteor/meteor';
import TopNav from './Shared/TopNav';
import HomeIcon from '@material-ui/icons/HomeRounded';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 80,
    right: theme.spacing(2),
  },
  footer: {
    top: 'auto',
    bottom: 0,
  },
}));

export default function Join(props) {
  const classes = useStyles();
  const topNavStart = {
    icon: (<Home />),
    title: "Join",
    func: () => {
      props.history.push('/welcome')
    }
  }

  window.scrollTo(0, 0);
  handleScan = data => {
    console.log({ data });

    if (data) {
      if (data.startsWith("APAC")) {
        props.history.push('/register', { code: data.slice(4) })
      }
      else {
        console.log("the scanned QR code is not an APAC invitation code.")
      }
    }
  }

  handleError = err => {
    console.error(err)
  }


  if (Meteor.user()) {
    return (
      <React.Fragment>
        <CssBaseline />
        <TopNav topNavStart={topNavStart} />
        <Toolbar id="back-to-top-anchor" />
        <Container style={{ minHeight: '100vh' }}>
          <Box my={2}>
            <h2>You are currently logged in as {Meteor.user().profile.realName}</h2>
            <p>Please log out to sign up a new account.</p>
          </Box>
        </Container>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <CssBaseline />
        <TopNav topNavStart={topNavStart} />
        <Toolbar id="back-to-top-anchor" />
        <Container style={{ minHeight: '100vh' }}>
          <Box my={2}>
            <h2>Please scan your sponsor's QR code</h2>
            <p>You must be physically in attendance at an APAC Blocks event to become a member and you must be sponsored by an existing member.</p>
            <p>You will be asked to allow this site to access your camera. If you are having problems, please try another browser.</p>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ maxWidth: 500, margin: '0 auto' }}
            />
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
