import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder'
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import ImageIcon from '@material-ui/icons/PhotoSizeSelectActual'
import VideoIcon from '@material-ui/icons/Videocam'
import AudioIcon from '@material-ui/icons/Audiotrack'
import PdfIcon from "@material-ui/icons/PictureAsPdf"
import {FileWordBox,FilePowerpointBox,FileExcelBox,ScriptText} from 'mdi-material-ui'
import FileShowIcon from "@material-ui/icons/InsertDriveFile"
import {mediaType} from "../../config"

const styles = theme => ({
    container: {
        padding: "7px",
    },

    selected: {
        "&:hover": {
            border: "1px solid #d0d0d0",
        },
        backgroundColor: theme.palette.explorer.bgSelected,

    },

    notSelected: {
        "&:hover": {
            backgroundColor: "#f9f9f9",
            border: "1px solid #d0d0d0",
        },
        backgroundColor: theme.palette.background.paper,
    },

    button: {
        height: "50px",
        border: "1px solid #dadce0",
        width: "100%",
        borderRadius: "6px",
        boxSizing: "border-box",
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        display: "flex",
        justifyContent: "left",
        alignItems: "initial",
    },
    icon: {
        margin: "10px 10px 10px 16px",
        height: "30px",
        minWidth: "30px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "90%",
        paddingTop: "2px",
        color: theme.palette.explorer.icon,
    },
    folderNameSelected: {
        color: theme.palette.primary.dark,
        fontWeight: "500",
    },
    folderNameNotSelected: {
        color: theme.palette.explorer.filename,
    },
    folderName: {
        marginTop: "15px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        marginRight: "20px",
    },
    iconImg :  {
        color:"#d32f2f",
    },
    iconImgBig:{    
        color:"#d32f2f",
        fontSize: "50px",
    },
    iconVideo :  {
        color:"#d50000",
    },
    iconVideoBig:{    
        color:"#d50000",
        fontSize: "50px",
    },
    iconAudio :  {
        color:"#651fff",
    },
    iconAudioBig:{    
        color:"#651fff",
        fontSize: "50px",
    },
    iconPdf :  {
        color:"#f44336",
    },
    iconPdfBig:{    
        color:"#f44336",
        fontSize: "50px",
    },
    iconWord :  {
        color:"#538ce5",
    },
    iconWordBig:{    
        color:"#538ce5",
        fontSize: "50px",
    },
    iconPpt :  {
        color:"rgb(239, 99, 63)",
    },
    iconPptBig:{    
        color:"rgb(239, 99, 63)",
        fontSize: "50px",
    },
    iconExcel :  {
        color:"#4caf50",
    },
    iconExcelBig:{    
        color:"#4caf50",
        fontSize: "50px",
    },
    iconText :  {
        color:"#607d8b",
    },
    iconTextBig:{    
        color:"#607d8b",
        fontSize: "50px",
    },
    iconFile :  {
        color:"#424242",
    },
    iconFileBig:{    
        color:"#424242",
        fontSize: "50px",
    },
})

const mapStateToProps = state => {
    return {
        selected: state.explorer.selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

class SmallIconCompoment extends Component {

    state = {
    }


    render() {

        const { classes } = this.props;

        let icon,iconBig;
        let fileType =this.props.file.name.split(".").pop().toLowerCase();
        if (mediaType["image"].indexOf(fileType)!==-1){
            icon = (<ImageIcon className={classes.iconImg}/>);
            iconBig = (<ImageIcon className={classes.iconImgBig}/>);
        }else if(mediaType["video"].indexOf(fileType)!==-1){
            icon = (<VideoIcon className={classes.iconVideo}/>);
            iconBig = (<VideoIcon className={classes.iconVideoBig}/>); 
        }else if(mediaType["audio"].indexOf(fileType)!==-1){
            icon = (<AudioIcon className={classes.iconAudio}/>);
            iconBig = (<AudioIcon className={classes.iconAudioBig}/>); 
        }else if(mediaType["pdf"].indexOf(fileType)!==-1){
            icon = (<PdfIcon className={classes.iconPdf}/>);
            iconBig = (<PdfIcon className={classes.iconPdfBig}/>); 
        }else if(mediaType["word"].indexOf(fileType)!==-1){
            icon = (<FileWordBox className={classes.iconWord}/>);
            iconBig = (<FileWordBox className={classes.iconWordBig}/>); 
        }else if(mediaType["ppt"].indexOf(fileType)!==-1){
            icon = (<FilePowerpointBox className={classes.iconPpt}/>);
            iconBig = (<FilePowerpointBox className={classes.iconPptBig}/>); 
        }else if(mediaType["excel"].indexOf(fileType)!==-1){
            icon = (<FileExcelBox className={classes.iconExcel}/>);
            iconBig = (<FileExcelBox className={classes.iconExcelBig}/>);  
        }else if(mediaType["text"].indexOf(fileType)!==-1){
            icon = (<ScriptText className={classes.iconText}/>);
            iconBig = (<ScriptText className={classes.iconTextBig}/>);  
        }else{
            icon = (<FileShowIcon className={classes.iconText}/>);
            iconBig = (<FileShowIcon className={classes.iconTextBig}/>);  
        }


        const isSelected = (this.props.selected.findIndex((value) => {
            return value === this.props.file;
        })) !== -1;

        return (
                <ButtonBase
                    focusRipple
                    className={classNames({
                        [classes.selected]: isSelected,
                        [classes.notSelected]: !isSelected,
                    }, classes.button)}
                >
                    <div className={classNames(classes.icon, {
                        [classes.iconSelected]: isSelected,
                        [classes.iconNotSelected]: !isSelected,
                    })}>{icon}</div>
                    <Tooltip title={this.props.file.name} aria-label={this.props.file.name}>
                        <Typography className={classNames(classes.folderName, {
                            [classes.folderNameSelected]: isSelected,
                            [classes.folderNameNotSelected]: !isSelected,
                        })}>{this.props.file.name}</Typography>
                    </Tooltip>
                </ButtonBase>
        );
    }
}

SmallIconCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
};


const SmallIcon = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SmallIconCompoment))

export default SmallIcon