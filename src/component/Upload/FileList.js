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
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    progressBar:{
        marginTop:5,
    },
    minHight:{
        [theme.breakpoints.up('sm')]: {
            minWidth:500,
        }
    },
    dialogContent:{
        padding:0,
    },
    successStatus:{
        marginBottom:10,
        color:"#4caf50",
    },
    errorStatus:{
        marginBottom:10,
        color:"#ff5722",
    },
});
class FileList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [
                //{name:"测试.zip",status:5,size:151201}
            ],
        };
    }

    //入队
    enQueue(files) {
        var filesNow = this.state.files;
        if (filesNow.findIndex((file) => { return file.id === files.id }) === -1) {
            filesNow.push(files);
            this.setState({
                files: filesNow,
            });
        }

    }

    deQueue(file){
        var filesNow = this.state.files;
        var fileID = filesNow.findIndex((f) => { return f.id === file.id });
        if (fileID !== -1) {
            filesNow.splice(fileID, 1);
            this.setState({
                files: filesNow,
            });
        }
    }

    updateStatus(file){
        var filesNow = this.state.files;
        var fileID = filesNow.findIndex((f) => { return f.id === file.id });
        if (fileID !== -1) {
            filesNow[fileID] = file;
            this.setState({
                files: filesNow,
            });
        }
    }

    setComplete(file){
        var filesNow = this.state.files;
        var fileID = filesNow.findIndex((f) => { return f.id === file.id });
        if (fileID !== -1) {
            if(filesNow[fileID].status!==4){
                filesNow[fileID].status = 5;
                this.setState({
                    files: filesNow,
                });
            }
            
        }
    }

    setError(file,errMsg){
        var filesNow = this.state.files;
        var fileID = filesNow.findIndex((f) => { return f.id === file.id });
        if (fileID !== -1) {
            filesNow[fileID].status = 4;
            filesNow[fileID].errMsg = errMsg;
        }else{
            file.status = 4;
            file.errMsg = errMsg;
            filesNow.push(file);
        }
        this.setState({
            files: filesNow,
        });
    }

    Transition(props) {
        return <Slide direction="up" {...props} />;
    }
    openFileList = () => {
        if(!this.state.open){
            this.setState({ open: true });
        }
        
    };

    cancelUpload = file =>{
        this.props.cancelUpload(file);
        this.deQueue(file);
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;
        const { width } = this.props;

        this.props.inRef({
            "openFileList":this.openFileList.bind(this),
            "enQueue":this.enQueue.bind(this),
            "updateStatus":this.updateStatus.bind(this),
            "setComplete":this.setComplete.bind(this),
            "setError":this.setError.bind(this),
        });

        var listContent = (
            this.state.files.map(function(item, i){
                var progressItem;
                if(item.status ===5){
                    progressItem = (<ListItemText primary={item.name} secondary={<div className={classes.successStatus}>已完成<br/></div>} />);
                }else if (item.status ===2){
                    var progressItem = (<ListItemText primary={item.name} secondary={<div>{window.plupload.formatSize(item.speed).toUpperCase()}/s 已上传 {window.plupload.formatSize(item.loaded).toUpperCase()} , 共 {window.plupload.formatSize(item.size).toUpperCase()} - {item.percent}% <br/><LinearProgress variant="determinate" value={item.percent} className={classes.progressBar} /></div>}/>);
                }else if (item.status ===1){
                    progressItem = (<ListItemText primary={item.name} secondary={<div>排队中<br/><LinearProgress className={classes.progressBar}/></div>} />);
                }else if (item.status ===4){
                    progressItem = (<ListItemText primary={item.name} secondary={<div className={classes.errorStatus}>{item.errMsg}<br/></div>} />);
                }else{
                    progressItem = (<ListItemText primary={item.name} secondary={item.status} />);
                }
                return (
                    <div key={i}>
                        <ListItem button >
                            <Avatar>
                                <FileIcon />
                            </Avatar>
                            {progressItem}
                            
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete" onClick={()=>this.cancelUpload(item)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                        <Divider /></div>
                );
            },this)

        );

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
                <DialogContent className={classes.dialogContent}>
                <List className={classes.minHight}>
                    {listContent}
                </List>
                </DialogContent>
            </Dialog>
        );
    }

}
FileList.propTypes = {
};

export default withStyles(styles)(withWidth()(FileList));