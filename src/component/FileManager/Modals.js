import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
    closeAllModals,
    toggleSnackbar,
    setModalsLoading,
    refreshFileList,
    refreshStorage,
} from "../../actions/index"
import PathSelector from "./PathSelector"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        color: theme.palette.secondary.light ,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    contentFix:{
        padding: "10px 24px 0px 24px",
    },
    shareUrl:{
        minWidth:"400px",
    },
    widthAnimation:{

    },
})

const mapStateToProps = state => {
    return {
        path:state.navigator.path,
        selected:state.explorer.selected,
        modalsStatus:state.viewUpdate.modals,
        modalsLoading:state.viewUpdate.modalsLoading,
        dirList:state.explorer.dirList,
        fileList:state.explorer.fileList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeAllModals:()=>{
            dispatch(closeAllModals());
        },
        toggleSnackbar:(vertical,horizontal,msg,color)=>{
            dispatch(toggleSnackbar(vertical,horizontal,msg,color))
        },
        setModalsLoading:(status)=>{
            dispatch(setModalsLoading(status))
        },
        refreshFileList:()=>{
            dispatch(refreshFileList())
        },
        refreshStorage:()=>{
            dispatch(refreshStorage())
        }
    }
}

class ModalsCompoment extends Component {


    state={
        newFolderName: "",
        newName:"",
        selectedPath:"",
        selectedPathName:"",
        secretShare:false,
        sharePwd:"",
        shareUrl:"",
        downloadURL:"",
        remoteDownloadPathSelect:false,
        source:"",
    } 

    handleInputChange = (e)=>{
        this.setState({
            [e.target.id]:e.target.value, 
        });
    }

    newNameSuffix = "";

    componentWillReceiveProps = (nextProps)=>{
        if(this.props.modalsStatus.rename!==nextProps.modalsStatus.rename){
            let name = nextProps.selected[0].name.split(".");
            if(name.length>1){
                 this.newNameSuffix = name.pop();
            }
            this.setState({
                newName:name.join("."),
            });
            return; 
        }
        if((this.props.modalsStatus.getSource!==nextProps.modalsStatus.getSource)&&nextProps.modalsStatus.getSource===true){
            axios.post('/File/gerSource', {
                action: 'source',
                path:(this.props.selected[0].path === "/"?"":this.props.path)+"/"+this.props.selected[0].name,
            })
            .then( (response)=> {
                this.setState({
                    source:response.data.url,
                })
            })
            .catch((error) =>{
                this.props.toggleSnackbar("top","right",error.message ,"error");
            });
        }
    }

    submitShare = e => {
        e.preventDefault();
        this.props.setModalsLoading(true);
        axios.post('/File/Share', {
            action: 'share',
            item: this.props.selected[0].path === "/" ? this.props.selected[0].path+this.props.selected[0].name:this.props.selected[0].path+"/"+this.props.selected[0].name,
            shareType:this.state.secretShare?"private":"public",
            pwd:this.state.sharePwd
        })
        .then( (response)=> {
            if(response.data.result!==""){
                this.setState({
                    shareUrl:response.data.result,
                });
            }else{
                this.props.toggleSnackbar("top","right",response.data.result.error,"warning");
            }
            this.props.setModalsLoading(false);
        })
        .catch((error) =>{
            this.props.toggleSnackbar("top","right",error.message ,"error");
            this.props.setModalsLoading(false);
        });
    }

    submitRemove = e =>{
        e.preventDefault();
        this.props.setModalsLoading(true);
        let dirs=[],items = [];
        // eslint-disable-next-line
        this.props.selected.map((value)=>{
            if(value.type==="dir"){
                dirs.push(value.path === "/" ? value.path+value.name:value.path+"/"+value.name);
            }else{
                items.push(value.path === "/" ? value.path+value.name:value.path+"/"+value.name);
            }
        });
        axios.post('/File/Delete', {
            action: 'delete',
            items: items,
            dirs:dirs, 
            newPath:this.state.selectedPath === "//"?"/":this.state.selectedPath,
        })
        .then( (response)=> {
            if(response.data.result.success){
                this.onClose();
                this.props.refreshFileList(); 
            }else{
                this.props.toggleSnackbar("top","right",response.data.result.error,"warning");
            }
            this.props.setModalsLoading(false);
            this.props.refreshStorage();
        })
        .catch((error) =>{
            this.props.toggleSnackbar("top","right",error.message ,"error");
            this.props.setModalsLoading(false);

        });
    }

    submitMove = e =>{
        e.preventDefault();
        this.props.setModalsLoading(true);
        let dirs=[],items = [];
        // eslint-disable-next-line
        this.props.selected.map((value)=>{
            if(value.type==="dir"){
                dirs.push(value.path === "/" ? value.path+value.name:value.path+"/"+value.name);
            }else{
                items.push(value.path === "/" ? value.path+value.name:value.path+"/"+value.name);
            }
        });
        axios.post('/File/Move', {
            action: 'move',
            items: items,
            dirs:dirs, 
            newPath:this.state.selectedPath === "//"?"/":this.state.selectedPath,
        })
        .then( (response)=> {
            if(response.data.result.success){
                this.onClose();
                this.props.refreshFileList(); 
            }else{
                this.props.toggleSnackbar("top","right",response.data.result.error,"warning");
            }
            this.props.setModalsLoading(false);
        })
        .catch((error) =>{
            this.props.toggleSnackbar("top","right",error.message ,"error");
            this.props.setModalsLoading(false);
        });
    }

    submitRename = e =>{
        e.preventDefault();
        this.props.setModalsLoading(true); 
        let newName = this.state.newName+(this.newNameSuffix===""?"":"."+this.newNameSuffix);
        if(this.props.dirList.findIndex((value,index)=>{
            return value.name === newName;
        })!==-1 || this.props.fileList.findIndex((value,index)=>{
            return value.name === newName;
        })!==-1){
            this.props.toggleSnackbar("top","right","新名称与已有文件重复","warning");
            this.props.setModalsLoading(false); 
        }else{
            axios.post('/File/Rename', {
                action: 'rename',
                item: (this.props.selected[0].path === "/"?"":this.props.path)+"/"+this.props.selected[0].name,
                newItemPath:(this.props.selected[0].path === "/"?"":this.props.path)+"/"+newName, 
            })
            .then( (response)=> {
                if(response.data.result.success){
                    this.onClose();
                    this.props.refreshFileList(); 
                }else{
                    this.props.toggleSnackbar("top","right",response.data.result.error,"warning");
                }
                this.props.setModalsLoading(false);

            })
            .catch((error) =>{
                this.props.toggleSnackbar("top","right",error.message ,"error");
            this.props.setModalsLoading(false);

            });
        }
    }

    submitCreateNewFolder = e =>{
        e.preventDefault();
        this.props.setModalsLoading(true); 
        if(this.props.dirList.findIndex((value,index)=>{
            return value.name === this.state.newFolderName;
        })!==-1){
            this.props.toggleSnackbar("top","right","文件夹名称重复","warning");
            this.props.setModalsLoading(false); 
        }else{
            axios.post('/File/createFolder', {
                action: '"createFolder"',
                newPath: (this.props.path === "/"?"":this.props.path)+"/"+this.state.newFolderName,
            })
            .then( (response)=> {
                if(response.data.result.success){
                    this.onClose();
                    this.props.refreshFileList(); 
                }else{
                    this.props.toggleSnackbar("top","right",response.data.result.error,"warning");
                }
                this.props.setModalsLoading(false);

            })
            .catch((error) =>{
            this.props.setModalsLoading(false);

                this.props.toggleSnackbar("top","right",error.message ,"error");
            });
        }
        //this.props.toggleSnackbar();
    }

    submitTorrentDownload = e =>{
        e.preventDefault();
        this.props.setModalsLoading(true);
        axios.post('/RemoteDownload/AddTorrent', {
            action: "torrentDownload",
            id: this.props.selected[0].id,
            savePath: this.state.selectedPath,
        })
        .then( (response)=> {
            if(response.data.result.success){
                this.props.toggleSnackbar("top","right","任务已创建","success");
                this.onClose();
            }else{
                this.props.toggleSnackbar("top","right",response.data.result.error,"warning");
            }
            this.props.setModalsLoading(false);
        })
        .catch((error) =>{
            this.props.toggleSnackbar("top","right",error.message ,"error");
            this.props.setModalsLoading(false);
        });
    }

    submitDownload = e=>{
        e.preventDefault();
        this.props.setModalsLoading(true);
        axios.post('/RemoteDownload/addUrl', {
            action: 'remoteDownload',
            url: this.state.downloadURL,
            path: this.state.selectedPath,
        })
        .then( (response)=> {
            if(response.data.result.success){
                this.props.toggleSnackbar("top","right","任务已创建","success");
                this.onClose();
            }else{
                this.props.toggleSnackbar("top","right",response.data.result.error,"warning");
            }
            this.props.setModalsLoading(false);
        })
        .catch((error) =>{
            this.props.toggleSnackbar("top","right",error.message ,"error");
            this.props.setModalsLoading(false);
        });
    }

    setMoveTarget = (folder) =>{
        let path = folder.path === "/" ?folder.path+folder.name:folder.path+"/"+folder.name;
        this.setState({
            selectedPath:path,
            selectedPathName:folder.name,
        });
    }

    remoteDownloadNext = ()=>{
        this.props.closeAllModals();
        this.setState({
            remoteDownloadPathSelect:true,
        });
    }

    onClose = ()=>{
        this.setState({
            newFolderName: "",
            newName:"",
            selectedPath:"",
            selectedPathName:"",
            secretShare:false,
            sharePwd:"",
            downloadURL:"",
            shareUrl:"",
            remoteDownloadPathSelect:false,
            source:"",
        });
        this.newNameSuffix = "";
        this.props.closeAllModals();
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        
        const { classes} = this.props;

        const previewApi = window.apiURL.preview;

        return (
            <div>
                <Dialog
                open={this.props.modalsStatus.getSource}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">获取文件外链</DialogTitle>
                    
                    <DialogContent>
                        <form onSubmit={this.submitCreateNewFolder}>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="newFolderName"
                            label="外链地址"
                            type="text"
                            value={this.state.source}
                            fullWidth
                            /> 
                         </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            关闭
                        </Button>
                    </DialogActions>
                
                </Dialog>
                <Dialog
                open={this.props.modalsStatus.createNewFolder}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">新建文件夹</DialogTitle>
                    
                    <DialogContent>
                        <form onSubmit={this.submitCreateNewFolder}>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="newFolderName"
                            label="文件夹名称"
                            type="text"
                            value={this.state.newFolderName}
                            onChange={(e)=>this.handleInputChange(e)} 
                            fullWidth
                            /> 
                         </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            取消
                        </Button>
                        <div className={classes.wrapper}>
                            <Button onClick={this.submitCreateNewFolder} color="primary" disabled={this.state.newFolderName==="" || this.props.modalsLoading }>
                                创建
                                {this.props.modalsLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Button>
                        </div>
                    </DialogActions>
                
                </Dialog>
                <Dialog
                open={this.props.modalsStatus.rename}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth={true}
                >
                <DialogTitle id="form-dialog-title">重命名</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            输入 <strong>{this.props.selected.length===1?this.props.selected[0].name:""}</strong> 的新名称：
                        </DialogContentText>
                        <form onSubmit={this.submitRename}>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="newName"
                            label="新名称"
                            type="text"
                            value={this.state.newName}
                            onChange={(e)=>this.handleInputChange(e)} 
                            fullWidth 
                            
                            /> 
                         </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            取消
                        </Button>
                        <div className={classes.wrapper}>
                            <Button onClick={this.submitRename} color="primary" disabled={this.state.newName==="" || this.props.modalsLoading }>
                                确定
                                {this.props.modalsLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Button>
                        </div>
                    </DialogActions>
                
                </Dialog>
                <Dialog
                open={this.props.modalsStatus.move}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">移动至</DialogTitle>
                <PathSelector presentPath={this.props.path} selected={this.props.selected} onSelect ={ this.setMoveTarget}/>

                {this.state.selectedPath!==""&&<DialogContent className={classes.contentFix}>
                    <DialogContentText >
                        移动至 <strong>{this.state.selectedPathName}</strong>
                    </DialogContentText>
                </DialogContent>}
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            取消
                        </Button>
                        <div className={classes.wrapper}>
                            <Button onClick={this.submitMove} color="primary" disabled={this.state.selectedPath==="" || this.props.modalsLoading }>
                                确定
                                {this.props.modalsLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Button>
                        </div>
                    </DialogActions>
                
                </Dialog>
                <Dialog
                open={this.props.modalsStatus.remove}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">删除对象</DialogTitle>
                    
                    <DialogContent>
                        <DialogContentText>
                            确定要删除{(this.props.selected.length === 1)&& 
                                <strong> {this.props.selected[0].name} </strong>
                            }{(this.props.selected.length > 1)&& 
                                <span>这{this.props.selected.length}个对象</span>
                            }吗？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            取消
                        </Button>
                        <div className={classes.wrapper}>
                            <Button onClick={this.submitRemove} color="primary" disabled={this.props.modalsLoading }>
                                确定
                                {this.props.modalsLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
                <Dialog
                open={this.props.modalsStatus.share}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                className={classes.widthAnimation}
                >
                <DialogTitle id="form-dialog-title">创建分享链接</DialogTitle>
                    
                    <DialogContent>
                        <DialogContentText>
                            获取用于共享的链接
                        </DialogContentText>
                        {this.state.shareUrl===""&&
                            <form
                            onSubmit = {this.submitShare}
                            >
                            <FormControlLabel
                            control={    
                            <Checkbox
                                checked={this.state.secretShare}
                                onChange={this.handleChange('secretShare')}
                                name="secretShare"
                                value="false"
                            />}
                            label="使用密码保护链接"/>
                            {this.state.secretShare&&
                            <FormControl margin="nonw" fullWidth>
                            <TextField
                                id="sharePwd"
                                onChange={this.handleInputChange}
                                label="分享密码"
                                type="password"
                                margin="none"
                                autoFocus
                                value={this.state.sharePwd}
                                required
                            /></FormControl>}
                            </form>
                        }
                    {this.state.shareUrl!==""&&
                        <TextField
                        id="shareUrl"
                        label="分享链接"
                        autoFocus
                        fullWidth
                        className={classes.shareUrl}
                        value={this.state.shareUrl}
                        />
 
                    }
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            {this.state.shareUrl===""?"取消":"关闭"}
                        </Button>
                        {this.state.shareUrl===""&&<div className={classes.wrapper}>
                            <Button onClick={this.submitShare} color="primary" disabled={this.props.modalsLoading||(this.state.secretShare&&this.state.sharePwd==="") }>
                                确定
                                {this.props.modalsLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Button>
                        </div>}
                    </DialogActions>
                
                </Dialog>
                <Dialog
                open={this.props.modalsStatus.music}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">音频播放</DialogTitle>
                    
                    <DialogContent>
                        <DialogContentText>
                            {(this.props.selected.length!==0)&&
                                <audio controls src={previewApi+"?action=preview&path="+(this.props.selected[0].path === "/" ? this.props.selected[0].path+this.props.selected[0].name:this.props.selected[0].path+"/"+this.props.selected[0].name)}></audio>
                            }
                           
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            关闭
                        </Button>
                    
                    </DialogActions>
                </Dialog>
                <Dialog
                open={this.props.modalsStatus.remoteDownload}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                >
                <DialogTitle id="form-dialog-title">新建离线下载任务</DialogTitle>
                    
                    <DialogContent>
                        <DialogContentText>
                           <TextField
                           label="文件地址"
                           autoFocus
                           fullWidth
                           id="downloadURL"
                           onChange={this.handleInputChange}
                           placeholder="输入文件下载地址，支持 HTTP(s)/FTP/磁力链"
                           ></TextField>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            关闭
                        </Button>
                        <Button onClick={this.remoteDownloadNext} color="primary" disabled={this.props.modalsLoading||(this.state.downloadURL==="") }>
                                下一步
                        </Button>
                    
                    </DialogActions>
                </Dialog>
                <Dialog
                open={this.state.remoteDownloadPathSelect}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">选择存储位置</DialogTitle>
                <PathSelector presentPath={this.props.path} selected={this.props.selected} onSelect ={ this.setMoveTarget}/>

                {this.state.selectedPath!==""&&<DialogContent className={classes.contentFix}>
                    <DialogContentText >
                        下载至 <strong>{this.state.selectedPathName}</strong>
                    </DialogContentText>
                </DialogContent>}
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            取消
                        </Button>
                        <div className={classes.wrapper}>
                            <Button onClick={this.submitDownload} color="primary" disabled={this.state.selectedPath==="" || this.props.modalsLoading }>
                                创建任务
                                {this.props.modalsLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Button>
                        </div>
                    </DialogActions>
                
                </Dialog>
                <Dialog
                open={this.props.modalsStatus.torrentDownload}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">选择存储位置</DialogTitle>
                <PathSelector presentPath={this.props.path} selected={this.props.selected} onSelect ={ this.setMoveTarget}/>

                {this.state.selectedPath!==""&&<DialogContent className={classes.contentFix}>
                    <DialogContentText >
                        下载至 <strong>{this.state.selectedPathName}</strong>
                    </DialogContentText>
                </DialogContent>}
                    <DialogActions>
                        <Button onClick={this.onClose}>
                            取消
                        </Button>
                        <div className={classes.wrapper}>
                            <Button onClick={this.submitTorrentDownload} color="primary" disabled={this.state.selectedPath==="" || this.props.modalsLoading }>
                                创建任务
                                {this.props.modalsLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Button>
                        </div>
                    </DialogActions>
                
                </Dialog>
            </div>
        );
    }
}

ModalsCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
};


const Modals = connect(
    mapStateToProps,
    mapDispatchToProps
)( withStyles(styles)(ModalsCompoment))
  
export default Modals