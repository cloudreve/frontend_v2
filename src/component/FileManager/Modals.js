import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
    closeAllModals,
    toggleSnackbar,
    setModalsLoading,
    refreshFileList,
} from "../../actions/index"

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

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
})

const mapStateToProps = state => {
    return {
        path:state.navigator.path,
        selected:state.explorer.selected,
        modalsStatus:state.viewUpdate.modals,
        modalsLoading:state.viewUpdate.modalsLoading,
        dirList:state.explorer.dirList,
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
        }
    }
}

class ModalsCompoment extends Component {


    state={
        newFolderName: "",
    } 

    handleInputChange = (e)=>{
        this.setState({
            [e.target.id]:e.target.value, 
        });
    }

    submitCreateNewFolder = (e)=>{
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
                newPath: this.props.path+"/"+this.state.newFolderName,
            })
            .then( (response)=> {
                if(response.data.result.success){
                    this.onClose();
                    this.props.refreshFileList(); 
                }else{
                    this.props.toggleSnackbar("top","right",response.data.result.error,"warning");
                }
            })
            .catch((error) =>{
                this.props.toggleSnackbar("top","right",error.message ,"error");
            });
            this.props.setModalsLoading(false);
        }
        //this.props.toggleSnackbar();
    }

    onClose = ()=>{
        this.setState({
            newFolderName: "",
        });
        this.props.closeAllModals();
    }

    render() {
        
        const { classes} = this.props;

        return (
            <div>
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