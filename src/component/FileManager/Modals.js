import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
    closeAllModals,
    toggleSnackbar,
} from "../../actions/index"

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({

})

const mapStateToProps = state => {
    return {
        path:state.navigator.path,
        selected:state.explorer.selected,
        modalsStatus:state.viewUpdate.modals,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeAllModals:()=>{
            dispatch(closeAllModals());
        },
        toggleSnackbar:(vertical,horizontal,msg,color)=>{
            dispatch(toggleSnackbar("top","right","不能为空","warning"))
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
        this.props.toggleSnackbar();
    }

    render() {
        
        const { classes} = this.props;

        return (
            <div>
                <Dialog
                open={this.props.modalsStatus.createNewFolder}
                onClose={this.props.closeAllModals}
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
                        <Button onClick={this.props.closeAllModals}>
                        取消
                        </Button>
                        <Button onClick={this.submitCreateNewFolder} color="primary">
                        创建
                        </Button>
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