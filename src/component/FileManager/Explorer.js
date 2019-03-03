import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {navitateTo,changeContextMenu} from "../../actions/index"
import Folder from "./Folder"
import ContextMenu from "./ContextMenu"

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin:"10px",

    },
    root: {
        flexGrow: 1,
        padding:"10px",
    },
    typeHeader:{
        margin: "10px 25px",
        color: "#6b6b6b",
        fontWeight: "500",
    }
})

const mapStateToProps = state => {
    return {
      path: state.navigator.path,
      drawerDesktopOpen:state.viewUpdate.open,
      viewMethod:state.viewUpdate.explorerViewMethod,
      sortMethod:state.viewUpdate.sortMethod,
      fileList:state.explorer.fileList,
      dirList:state.explorer.dirList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        navigateToPath: path => {
            dispatch(navitateTo(path))
        },
        changeContextMenu: type => {
            dispatch(changeContextMenu(type))
        },
    }
}

class ExplorerCompoment extends Component {
    
    contextMenu = (e) => {
        e.preventDefault();
        this.props.changeContextMenu("empty");
    }

    render() {
        
        const { classes} = this.props;

        return (
            <div className={classes.root} onContextMenu = {this.contextMenu}>
                <ContextMenu/>
                {this.props.dirList.length!==0&&
                    <div>
                        <Typography className={classes.typeHeader}>文件夹</Typography>
                        <Grid container spacing={0}
                        alignItems="flex-start"
                        >
                            {this.props.dirList.map((value,index)=>(
                                <Grid item xs={6} md={3} sm={4} lg={2}>
                                    <Folder folder={value}/>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                }
                
            </div>
        );
    }
}

ExplorerCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
    path:PropTypes.string.isRequired,
};


const Explorer = connect(
    mapStateToProps,
    mapDispatchToProps
  )( withStyles(styles)(ExplorerCompoment))
  
export default Explorer