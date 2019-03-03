import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {changeContextMenu} from "../../actions/index"

import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
})

const mapStateToProps = state => {
    return {
        menuType:state.viewUpdate.contextType,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeContextMenu: type => {
            dispatch(changeContextMenu(type))
        },
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

    render() {
        
        const { classes} = this.props;

        return (
           <div>
               <Popover
                id="simple-popper"
                open={this.props.menuType!=="none"}
                anchorReference="anchorPosition"
                anchorPosition={{ top: this.Y, left: this.X }}
                onClose={()=>this.props.changeContextMenu("none")}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                >
                <Typography className={classes.typography}>The content of the Popover.</Typography>
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