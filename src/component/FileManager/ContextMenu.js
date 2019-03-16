import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
    changeContextMenu,
    setNavigatorLoadingStatus,
    navitateTo,
    openCreateFolderDialog,
    openRenameDialog,
    openMoveDialog,
    openRemoveDialog,
    openShareDialog,
    showImgPreivew,
    openMusicDialog,
    toggleSnackbar,
    openRemoteDownloadDialog,
    openTorrentDownloadDialog,
    openGetSourceDialog,
 } from "../../actions/index"
import {isPreviewable,isTorrent} from "../../config"
import {allowSharePreview} from "../../untils/index"
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
import LinkIcon from '@material-ui/icons/InsertLink'
import DeleteIcon from '@material-ui/icons/Delete'
import OpenIcon from '@material-ui/icons/OpenInNew'
import {MagnetOn} from 'mdi-material-ui'

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
        },
        openCreateFolderDialog:()=>{
            dispatch(openCreateFolderDialog())
        },
        openRenameDialog:()=>{
            dispatch(openRenameDialog())
        },
        openMoveDialog:()=>{
            dispatch(openMoveDialog())
        },
        openRemoveDialog:()=>{
            dispatch(openRemoveDialog())
        },
        openShareDialog:()=>{
            dispatch(openShareDialog())
        },
        showImgPreivew:(first)=>{
            dispatch(showImgPreivew(first))
        },
        openMusicDialog:()=>{
            dispatch(openMusicDialog())
        },
        toggleSnackbar:(vertical,horizontal,msg,color)=>{
            dispatch(toggleSnackbar(vertical,horizontal,msg,color))
        },
        openRemoteDownloadDialog:()=>{
            dispatch(openRemoteDownloadDialog())
        },
        openTorrentDownloadDialog:()=>{
            dispatch(openTorrentDownloadDialog())
        },
        openGetSourceDialog:()=>{
            dispatch(openGetSourceDialog())
        }
    }
}

class ContextMenuCompoment extends Component {

    X=0;
    Y=0;
    
    state={
    }

    componentDidMount = ()=>{
        window.document.addEventListener("mousemove",this.setPoint);
    }

    setPoint = e=>{
        this.Y=e.clientY;
        this.X=e.clientX;
    };


    openDownload = ()=>{
        if(!allowSharePreview()){
            this.props.toggleSnackbar("top","right","未登录用户无法预览","warning");
            this.props.changeContextMenu("file",false);
            return;
        }
        this.props.changeContextMenu("file",false);
        let downloadPath = this.props.selected[0].path === "/" ? this.props.selected[0].path+this.props.selected[0].name:this.props.selected[0].path+"/"+this.props.selected[0].name;
        window.open(window.apiURL.download+"?action=download&path="+encodeURIComponent(downloadPath));

    }

    enterFolder = () => {
        this.props.navitateTo(this.props.path==="/"?this.props.path+this.props.selected[0].name:this.props.path+"/"+this.props.selected[0].name);
    }

    clickUpload = () => {
        this.props.changeContextMenu("empty",false);
        let uploadButton = document.getElementsByClassName("uploadForm")[0];
        if (document.body.contains(uploadButton)){
            uploadButton.click();
        }else{
            this.props.toggleSnackbar("top","right","上传组件还未加载完成","warning");
        }
    }

    openPreview = ()=>{
        if(!allowSharePreview()){
            this.props.toggleSnackbar("top","right","未登录用户无法预览","warning");
            this.props.changeContextMenu("file",false);
            return;
        }
        this.props.changeContextMenu("file",false);
        let previewPath = this.props.selected[0].path === "/" ? this.props.selected[0].path+this.props.selected[0].name:this.props.selected[0].path+"/"+this.props.selected[0].name;
        switch(isPreviewable(this.props.selected[0].name)){
            case 'img':
                this.props.showImgPreivew(this.props.selected[0]);
                return;
            case 'msDoc':
                window.open(window.apiURL.docPreiview+"/?path="+encodeURIComponent(previewPath));  
                return;
            case 'audio':
                this.props.openMusicDialog();
                return;
            case 'open':
                window.open(window.apiURL.preview+"/?action=preview&path="+encodeURIComponent(previewPath));  
                return;
            case 'video':
                if(window.isSharePage){
                    window.location.href=("/Viewer/Video?share=true&shareKey="+window.shareInfo.shareId+"&path="+encodeURIComponent(previewPath));  
                    return;
                }
                window.location.href=("/Viewer/Video?&path="+encodeURIComponent(previewPath));  
                return;
            case 'edit':
                if(window.isSharePage){
                    window.location.href=("/Viewer/Markdown?share=true&shareKey="+window.shareInfo.shareId+"&path="+encodeURIComponent(previewPath));  
                    return;
                }
                window.location.href=("/Viewer/Markdown?path="+encodeURIComponent(previewPath));  
                return;
            default:
                return;
        }
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
                        <MenuItem onClick={this.clickUpload}>
                            <ListItemIcon>
                                <UploadIcon/>
                            </ListItemIcon>
                            <Typography variant="inherit">上传文件</Typography>
                        </MenuItem>
                        {window.uploadConfig.allowRemoteDownload==="1"&&
                            <MenuItem onClick={()=>this.props.openRemoteDownloadDialog()}>
                                <ListItemIcon>
                                    <DownloadIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">离线下载</Typography>
                            </MenuItem>
                        }
                        
                        <Divider/>
                        <MenuItem onClick = {()=>this.props.openCreateFolderDialog()}> 
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
                        {(!this.props.isMultiple&&this.props.withFile&&isPreviewable(this.props.selected[0].name))&&
                            <div>
                                <MenuItem onClick={()=>this.openPreview()}>
                                    <ListItemIcon>
                                        <OpenIcon/>
                                    </ListItemIcon>
                                    <Typography variant="inherit">打开</Typography>
                                </MenuItem>
                                <Divider/>
                             </div>
                        }

                        {(!this.props.isMultiple&&this.props.withFile)&&
                            <MenuItem onClick={()=>this.openDownload()}>
                                <ListItemIcon>
                                    <DownloadIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">下载</Typography>
                            </MenuItem>
                        }

                        {(!this.props.isMultiple&&this.props.withFile&&(window.uploadConfig.allowSource==="1"))&&
                            <MenuItem onClick={()=>this.props.openGetSourceDialog()}>
                                <ListItemIcon>
                                    <LinkIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">获取外链</Typography>
                            </MenuItem>
                        }

                        {(!this.props.isMultiple&&window.isHomePage&&(window.uploadConfig.allowTorrentDownload==="1")&&this.props.withFile&&isTorrent(this.props.selected[0].name))&&
                            <MenuItem onClick={()=>this.props.openTorrentDownloadDialog()}>
                                <ListItemIcon>
                                    <MagnetOn/>
                                </ListItemIcon>
                                <Typography variant="inherit">创建离线下载任务</Typography>
                            </MenuItem>
                        }

                        {(!this.props.isMultiple &&window.isHomePage)&&
                            <MenuItem onClick={()=>this.props.openShareDialog()}>
                                <ListItemIcon>
                                    <ShareIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">分享</Typography>
                            </MenuItem>
                        }
                        
                        {(!this.props.isMultiple&&window.isHomePage)&&
                            <MenuItem onClick={()=>this.props.openRenameDialog() }>
                                <ListItemIcon>
                                    <RenameIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">重命名</Typography>
                            </MenuItem>
                        }
                        {window.isHomePage&&<div>
                            <MenuItem onClick={()=>this.props.openMoveDialog() }>
                                <ListItemIcon>
                                    <MoveIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">移动</Typography>
                            </MenuItem>
                            <Divider/>
                            <MenuItem className={classes.propover} onClick={()=>this.props.openRemoveDialog()}>
                                <ListItemIcon>
                                    <DeleteIcon/>
                                </ListItemIcon>
                                <Typography variant="inherit">删除</Typography>
                            </MenuItem>
                        </div>}
                        


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