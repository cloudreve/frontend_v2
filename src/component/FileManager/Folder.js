import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder'


const styles = theme => ({
    container:{
        padding: "7px",
    },
    
    button:{
        "&:hover":{
            backgroundColor:"#f9f9f9",
            border:"1px solid #d0d0d0",
        },
        height:"50px",
        border:"1px solid #dadce0",
        width:"100%",
        borderRadius: "6px",
        boxSizing: "border-box",
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backgroundColor:"#fff",
        display:"flex",
        justifyContent:"left",
        alignItems:"initial",
    },
    icon:{
        padding: "12px 16px",
        color:"#8f8f8f",
    },
    folderName:{
        color:"#474849",
        marginTop:"15px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        marginRight: "20px",
    }
})

const mapStateToProps = state => {
    return {
      path: state.navigator.path,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

class FolderCompoment extends Component {
    
    state={
    }
    render() {
        
        const { classes} = this.props;

        return (
           <div className={classes.container}>
               <ButtonBase
                focusRipple
                className={classes.button}
               >
                <div className={classes.icon}><FolderIcon/></div>
                <Typography className={classes.folderName}>{this.props.folder.name}</Typography>
                </ButtonBase>
               
            </div>
        );
    }
}

FolderCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
    folder: PropTypes.object.isRequired,
};


const Folder = connect(
    mapStateToProps,
    mapDispatchToProps
)( withStyles(styles)(FolderCompoment))
  
export default Folder