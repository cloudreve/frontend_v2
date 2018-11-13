import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
});
class FileList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [
                { name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" },{ name: "第第二次第二次第二次二次.docx" }
            ],
        };
    }

    enQueue(files) {
        var filesNow = this.state.files;
        if (filesNow.findIndex((file) => { return file.id === files.id }) === -1) {
            filesNow.push(files);
            this.setState({
                files: filesNow,
            });
        }

    }

    Transition(props) {
        return <Slide direction="up" {...props} />;
    }
    openFileList = () => {
        if(!this.state.open){
            this.setState({ open: true });
        }
        
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;
        const { width } = this.props;

        this.props.inRef(this.openFileList.bind(this));

        return (
            <Dialog
            fullScreen={isWidthDown("sm", width)}
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={this.Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" >
                            上传队列
                        </Typography>

                    </Toolbar>
                </AppBar>
                <List>
                    {
                        this.state.files.map(function (item, i) {
                            return (
                                <div key={i}>
                                    <ListItem button >
                                        <Avatar>
                                            <FileIcon />
                                        </Avatar>
                                        <ListItemText primary={item.name} secondary={<div>50<LinearProgress /></div>} />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>

                                    </ListItem>
                                    <Divider /></div>
                            );
                        })
                    }
                </List>
            </Dialog>
        );
    }

}
FileList.propTypes = {
};

export default withStyles(styles)(withWidth()(FileList));