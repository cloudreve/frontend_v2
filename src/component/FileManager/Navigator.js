import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {navitateTo} from "../../actions/index"

const mapStateToProps = state => {
    return {
      path: state.navigator.path,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      navigateToPath: path => {
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
    },
    expandMore:{
        color:"#8d8d8d",
    }
})

class NavigatorCompoment extends Component {
    

    state = {
        hidden:false,
        hiddenFolders:[],
        folders:[],
        anchorEl: null,
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
    }

    navigateTo=(event,id)=> {
        if(id===-1){
            this.props.navigateToPath("/");
        }else if (id == this.state.folders.length-1){
            this.setState({ anchorEl: event.currentTarget });
        }else{
            this.props.navigateToPath("/"+this.state.folders.slice(0,id+1).join("/"));
        }
        
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
    
    render() {

        const { classes} = this.props;

        return (
             <div className={classes.container}>
                <div className={classes.nav} ref={this.element}>
                    <span>           
                        <Button component="span" onClick={()=>this.navigateTo(-1)}>
                            /
                        </Button>
                        <RightIcon className={classes.rightIcon}/>
                    </span>
                    {this.state.folders.map((folder,id,folders)=>(
                        <span> 
                            {folder !=="" &&  
                            <span> 
                                <Button component="span" onClick={(e)=>this.navigateTo(e,id)}>
                                    {folder === ""?"":folder}
                                    {(id === folders.length-1) &&
                                        <ExpandMore className={classes.expandMore}/>
                                    }
                                </Button>
                                    {(id === folders.length-1) &&
                                        <Menu
                                        id="simple-menu"
                                        anchorEl={this.state.anchorEl}
                                        open={Boolean(this.state.anchorEl)}
                                        onClose={this.handleClose}
                                        >
                                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                        </Menu>
                                    }
                                 {(id !== folders.length-1) && <RightIcon className={classes.rightIcon}/>}
                            </span> 
                            }          
                           
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