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
    

    state = {
        hidden:false,
        hiddenFolders:[],
        folders:[],
    }

    constructor(props) {
        super(props);
        this.element = React.createRef();
    }

    componentDidMount = ()=>{
        this.renderPath();
    }

    renderPath = (path=null)=>{
        this.setState({
            folders:path!==null?path.substr(1).split("/"):this.props.path.substr(1).split("/"),
        });

    }

    componentWillReceiveProps = (nextProps)=>{
        if(this.props.path !== nextProps.path){
            this.renderPath(nextProps.path);
        }
    }

    componentDidUpdate = ()=>{
        this.checkOverFlow();
    }

    checkOverFlow = ()=>{
        const hasOverflowingChildren = this.element.current.offsetHeight < this.element.current.scrollHeight ||
        this.element.current.offsetWidth < this.element.current.scrollWidth;
        alert(hasOverflowingChildren);
    }

    click=()=> {
        this.props.onTodoClick(this.props.path+"/ss");
        
    }
    
    render() {

        const { classes,path } = this.props;

        return (
             <div className={classes.container}>
                <div className={classes.nav} ref={this.element}>
                    {this.state.folders.map((folder,key)=>(
                        <span>           
                            <Button component="span" onClick={this.click}>
                                {folder === ""?"/":folder}
                            </Button>
                            <RightIcon className={classes.rightIcon}/>
                        </span>
                    ))}
                  
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