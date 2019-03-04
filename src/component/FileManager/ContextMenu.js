import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
    changeContextMenu,
    setNavigatorLoadingStatus,
    navitateTo,
 } from "../../actions/index"


import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import UploadIcon from '@material-ui/icons/CloudUpload'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import NewFolderIcon from '@material-ui/icons/CreateNewFolder'
import OpenFolderIcon from '@material-ui/icons/FolderOpen'
import ShareIcon from '@material-ui/icons/Share'
import RenameIcon from '@material-ui/icons/BorderColor'
import MoveIcon from '@material-ui/icons/Input'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
    propover:{
        minWidth:"200px!important",
    }
})

const mapStateToProps = state => {
    return {
        menuType:state.viewUpdate.contextType,
        menuOpen:state.viewUpdate.contextOpen,
        isMultiple:state.explorer.selectProps.isMultiple,
        withFolder:state.explorer.selectProps.withFolder,
        withFile:state.explorer.selectProps.withFile,
        path:state.navigator.path,
        selected:state.explorer.selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeContextMenu: (type,open) => {
            dispatch(changeContextMenu(type,open))
        },
        setNavigatorLoadingStatus: status => {
            dispatch(setNavigatorLoadingStatus(status))
        },
        navitateTo:path => {
            dispatch(navitateTo(path))
        }
    }
}

class ContextMenuCompoment extends Component {

    X=0;
    Y=0;
    
    state={
    }

    componentWillReceiveProps = (nextProps)=>{
        if(nextProps.menuType!=="none"){
            this.Y=window.event.clientY;
            this.X=window.event.clientX;
        }
    }

    enterFolder = () => {
        this.props.navitateTo(this.props.path+this.props.selected[0].name);
    }

    render() {
        
        const { classes} = this.props;

        return (
           <div>
               <Popover
                id="simple-popper"
                open={this.props.menuOpen}
                anchorReference="anchorPosition"
                anchorPosition={{ top: this.Y, left: this.X }}
                onClose={()=>this.props.changeContextMenu(this.props.menuType,false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                >
                {this.props.menuType==="empty"&&
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <UploadIcon/>
                            </ListItemIcon>
                            <Typography variant="inherit">上传文件</Typography>
                        </MenuItem>
                        {window.uploadConfig.allowRemoteDownload==="1"&&
                            <MenuItem>
                                <ListItemIcon>
                                    <DownloadIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">云端下载</Typography>
                            </MenuItem>
                        }
                        
                        <Divider/>
                        <MenuItem>
                            <ListItemIcon>
                                <NewFolderIcon/>
                            </ListItemIcon>
                            <Typography variant="inherit">创建文件夹</Typography>
                        </MenuItem>

                    </MenuList>
                }
                {this.props.menuType!=="empty"&&
                    <MenuList>
                        {(!this.props.isMultiple && this.props.withFolder)&&
                            <MenuItem onClick={this.enterFolder}>
                                <ListItemIcon>
                                    <OpenFolderIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">进入</Typography>
                            </MenuItem>
                        }

                        {(!this.props.isMultiple)&&
                            <MenuItem>
                                <ListItemIcon>
                                    <ShareIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">分享</Typography>
                            </MenuItem>
                        }
                        
                        {(!this.props.isMultiple)&&
                            <MenuItem>
                                <ListItemIcon>
                                    <RenameIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">重命名</Typography>
                            </MenuItem>
                        }
                        <MenuItem>
                            <ListItemIcon>
                                <MoveIcon/>
                            </ListItemIcon>
                            <Typography variant="inherit">移动</Typography>
                        </MenuItem>
                        <Divider/>
                        <MenuItem className={classes.propover}>
                            <ListItemIcon>
                                <DeleteIcon/>
                            </ListItemIcon>
                            <Typography variant="inherit">删除</Typography>
                        </MenuItem>


                    </MenuList>
                }
                </Popover>
            </div>
        );
    }
}

ContextMenuCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
    menuType:PropTypes.string.isRequired,
};


const ContextMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)( withStyles(styles)(ContextMenuCompoment))
  
export default ContextMenu