import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {navitateTo,changeContextMenu} from "../../actions/index"
import Folder from "./Folder"
import FileIcon from "./FileIcon"
import ObjectIcon from "./ObjectIcon"
import ContextMenu from "./ContextMenu"

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper'
import EmptyIcon from "@material-ui/icons/Unarchive"
import { trackWindowScroll }
  from 'react-lazy-load-image-component';

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
    },
    loading:{
        justifyContent: "center",
        display: "flex",
        marginTop:"40px",
    },
    errorBox:{
        padding: theme.spacing.unit * 4,
    },
    errorMsg:{
        marginTop:"10px",
    },
    emptyContainer:{
        bottom: "0",
        height: "300px",
        margin: "50px auto",
        width: "300px",
        color: theme.palette.explorer.emptyIcon,
        textAlign: "center",
        paddingTop: "20px", 
    },
    emptyIcon:{
        fontSize: "160px", 
    },
    emptyInfoBig:{
        fontSize: "25px",
        color:theme.palette.text.disabled,
    },
    emptyInfoSmall:{
        color:theme.palette.text.hint,
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
        loading:state.viewUpdate.navigatorLoading,
        navigatorError:state.viewUpdate.navigatorError,
        navigatorErrorMsg:state.viewUpdate.navigatorErrorMsg,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        navigateToPath: path => {
            dispatch(navitateTo(path))
        },
        
        changeContextMenu: (type,open) => {
            dispatch(changeContextMenu(type,open))
        }
    }
}

class ExplorerCompoment extends Component {
    
    contextMenu = (e) => {
        e.preventDefault();
        if(!this.props.loading){
            this.props.changeContextMenu("empty",true);
        }
        
    }

    render() {
        
        const { classes} = this.props;

        return (
            <div 
            className={classes.root} 
            onContextMenu = {this.contextMenu}
            
            >
                <ContextMenu/>
                {this.props.navigatorError&&
                    <Paper  elevation={1} className={classes.errorBox}>
                    <Typography variant="h5" component="h3">
                        :(  请求时出现错误
                    </Typography>
                    <Typography color={"textSecondary"} className={classes.errorMsg}>{this.props.navigatorErrorMsg.message}</Typography>
                    </Paper>
                }
                {(this.props.loading && !this.props.navigatorError) &&
                    <div className={classes.loading}>
                        <CircularProgress />
                    </div>
                }
                {(this.props.dirList.length===0&&this.props.fileList.length===0&&!this.props.loading&&!this.props.navigatorError)&&
                    <div className={classes.emptyContainer}>
                       <EmptyIcon className={classes.emptyIcon}/> 
                       <div className={classes.emptyInfoBig}>拖拽文件至此</div>
                       <div className={classes.emptyInfoSmall}>或点击左侧“上传文件”按钮添加文件</div>

                    </div>
                }
                {(this.props.dirList.length!==0 && !this.props.loading)&&
                    <div>
                        <Typography className={classes.typeHeader}>文件夹</Typography>
                        <Grid container spacing={0}
                        alignItems="flex-start"
                        >
                            {this.props.dirList.map((value,index)=>(
                                <Grid item xs={6} md={3} sm={4} lg={2}>
                                    <ObjectIcon file={value}/>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                }
                {(this.props.fileList.length!==0 && !this.props.loading)&&
                    <div>
                        <Typography className={classes.typeHeader}>文件</Typography>
                        <Grid container spacing={0}
                        alignItems="flex-start"
                        >
                            {this.props.fileList.map((value,index)=>(
                                <Grid item xs={6} md={3} sm={4} lg={2}>
                                    <ObjectIcon file={value}/>
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
  )( withStyles(styles)(trackWindowScroll(ExplorerCompoment)))  
  
export default Explorer