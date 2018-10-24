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
	componentDidMount() {
		var uploader = window.Qiniu.uploader({
			runtimes: 'html5,flash,html4',
			browse_button: 'pickfiles',
			container: 'container',
			drop_element: 'container',
			max_file_size: window.uploadConfig.maxSize,
			flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
			dragdrop: true,
			chunk_size: window.ChunkSize,
			filters: {
			 mime_types :window.uploadConfig.allowedType,
		 },
			multi_selection: !(window.moxie.core.utils.Env.OS.toLowerCase() === "ios"),
			uptoken_url: "/Upload/Token",
			domain: "s",
			get_new_uptoken: true,
			auto_start: true,
			log_level: 5,
			init: {
				'FilesAdded': function(up, files) {
					// $('table').show();
					// $('#upload_box').show();
					// $('#success').hide();
					// $('#info_box').hide();
	
					//   $.cookie('path', decodeURI(getCookieByString("path_tmp"))); 
					// plupload.each(files, function(file) {
					// 	var progress = new FileProgress(file, 'fsUploadProgress');
					// 	progress.setStatus("等待...");
					// 	progress.bindUploadCancel(up);
					// });
				
				},
				'BeforeUpload': function(up, file) {
					// var progress = new FileProgress(file, 'fsUploadProgress');
					// var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
					// if (up.runtime === 'html5' && chunk_size) {
					// 	progress.setChunkProgess(chunk_size);
					// }
				},
				'UploadProgress': function(up, file) {
					// var progress = new FileProgress(file, 'fsUploadProgress');
					// var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
					// progress.setProgress(file.percent + "%", file.speed, chunk_size);
				},
				'UploadComplete': function(up, file) {
					// $('#success').show();
					// toastr["success"]("队列全部文件处理完毕");
					// getMemory();
				},
				'FileUploaded': function(up, file, info) {
					var progress = new window.FileProgress(file, 'fsUploadProgress');
					progress.setComplete(up, info);
				},
				'Error': function(up, err, errTip) {
					// $('#upload_box').show();
					// 	$('table').show();
					// 	$('#info_box').hide();
						var progress = new window.FileProgress(err.file, 'fsUploadProgress');
						progress.setError();
						progress.setStatus(errTip);
						//toastr["error"]("上传时遇到错误");
					}
			}
		});
	}
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
