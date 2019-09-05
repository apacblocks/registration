import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import QrReader from 'react-qr-reader'
import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'

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


  handleScan = data => {
    if (data) {
        console.log(data)
        props.history.push('/register')
    }
  }
  handleError = err => {
    console.error(err)
  }



  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
        <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="go back"
                        onClick={() => window.history.back()}
                    >
                        <ArrowBack />
                    </IconButton>
          <Typography variant="h6">APAC Block</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container style={{ minHeight: '100vh' }}>
        <Box my={2}>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ maxWidth: 500 , margin: '0 auto'}}
        />
        </Box>
      </Container>
    </React.Fragment>
  );
}
