import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button'
import { Route } from 'react-router'

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

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Main(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">APAC Block</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container style={{ minHeight: '100vh' }}>
        <Box my={2}>
          {[...new Array(12)]
            .map(
              () => `Welcome to APAC Blocks
              The APAC region is home to many interesting people and projects in the blockchain field, but is often overlooked on the international stage.
              
              The idea behind APAC Blocks is to:
              
              Highlight competent people and projects solving real problems,
              Raise the general standards of blockchain-literacy,
              Enable peer-discovery of high signal to noise ratio people.
              Membership Protocol and Fees
              New members can only join the organisation while in physical attendance at an APAC Blocks event.
              
              The first 88 memberships are free. Any member can invite a maximum of two new members - membership is by invitation only. When the 88th person has joined as a member, an on-chain state change will be triggered giving all members the ability the vote on what (if any) membership fee should be charged.
              
              Token
              The organisation shall have an associated shitcoin which will be initially distributed at the Genesis event (Launch Party). The protocol rules for this token (such as inflation rate etc) are decided programmatically by on-chain voting.`,
            )
            .join('\n')}
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <AppBar position="sticky" color="primary" className={classes.footer}>
        <Toolbar>
          <Route render={({ history }) => (
            <Button color="inherit" style={{ width: '50%' }}
              onClick={() => { history.push('/join') }}
            >
              Join
      </Button>
          )} />

          <Route render={({ history }) => (
            <Button color="inherit" style={{ width: '50%' }}
              onClick={() => { history.push('/login') }}
            >
              Login
      </Button>
          )} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
