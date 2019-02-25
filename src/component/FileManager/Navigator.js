import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import RightIcon from '@material-ui/icons/KeyboardArrowRight'

import {navitateTo} from "../../actions/index"

const mapStateToProps = state => {
    return {
      path: state.navigator.path,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onTodoClick: path => {
        dispatch(navitateTo(path))
      }
    }
}

const styles = theme => ({
    container:{
        [theme.breakpoints.down('xs')]: {
            display:"none",
        },
    },
    nav:{
        height:"47px",
        padding:"5px 15px",
    },
    rightIcon:{
        marginTop: "6px",
        verticalAlign: "top",
        color:"#868686",
    }
})

class NavigatorCompoment extends Component {

    

    constructor(props) {
        super(props);
        this.element = React.createRef();
    }

    click=()=> {
        this.props.onTodoClick("//");
        alert(this.props.path);
        const hasOverflowingChildren = this.element.current.offsetHeight < this.element.current.scrollHeight ||
        this.element.current.offsetWidth < this.element.current.scrollWidth;
    }
    
    render() {

        const { classes,path } = this.props;

        return (
             <div className={classes.container}>
                <div className={classes.nav} ref={this.element}>
                    <Button component="span" onClick={this.click}>
                        {path}
                    </Button>
                    <RightIcon className={classes.rightIcon}/>
                    <Button component="span">
                        视频
                    </Button>
                    <RightIcon className={classes.rightIcon}/>
                    <Button component="span">
                        MSC纳新
                    </Button>
                    <RightIcon className={classes.rightIcon}/>
                    <Button component="span">
                        MSC纳新
                    </Button>
                    <RightIcon className={classes.rightIcon}/>
                    <Button component="span">
                        MSC纳新
                    </Button>
                    <RightIcon className={classes.rightIcon}/>
                    <Button component="span">
                        MSC纳新
                    </Button>
                    <RightIcon className={classes.rightIcon}/>
                    <Button component="span">
                        MSC纳新
                    </Button>
                    <RightIcon className={classes.rightIcon}/>
                </div>
                <Divider/>
             </div>
        );
    }

}

NavigatorCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
    path:PropTypes.string.isRequired,
};


const Navigator = connect(
    mapStateToProps,
    mapDispatchToProps
  )( withStyles(styles)(NavigatorCompoment))
  
  export default Navigator