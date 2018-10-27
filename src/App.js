import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Navbar from "./component/Navbar.js"
const styles = theme => ({

	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 0,
	},
	toolbar: theme.mixins.toolbar,
});

class App extends Component {

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<div className={classes.root}>
					<CssBaseline />
					<Navbar />
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<Typography paragraph>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
							ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
							facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
							gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
							donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
							adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
							Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
							imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
							arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
							donec massa sapien faucibus et molestie ac. </Typography>

					</main>
				</div>
			</React.Fragment>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
