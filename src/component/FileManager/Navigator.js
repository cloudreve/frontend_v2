import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import FolderIcon from '@material-ui/icons/Folder'
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
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
        backgroundColor:"#fff",
    },
    navigatorContainer:{
        "display": "flex",
        "justifyContent": "space-between",
    },
    nav:{
        height:"47px",
        padding:"5px 15px",
        display:"flex",
    },
    optionContainer:{

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
        hiddenMode:false,
        anchorHidden:null,
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

    componentDidUpdate = (prevProps,prevStates)=>{
        if(this.state.folders !== prevStates.folders){
            this.checkOverFlow();
        }
    }

    checkOverFlow = ()=>{
        const hasOverflowingChildren = this.element.current.offsetHeight < this.element.current.scrollHeight ||
        this.element.current.offsetWidth < this.element.current.scrollWidth;
        if(hasOverflowingChildren && !this.state.hiddenMode){
            this.setState({hiddenMode:true});
        }
        if(!hasOverflowingChildren && this.state.hiddenMode){
            this.setState({hiddenMode:false});
        }
    }

    navigateTo=(event,id)=> {
        if(id===-1){
            this.props.navigateToPath("/");
            this.handleClose();
        }else if (id == this.state.folders.length-1){
            this.setState({ anchorEl: event.currentTarget });
        }else{
            this.props.navigateToPath("/"+this.state.folders.slice(0,id+1).join("/"));
            this.handleClose();
        }
        
        
    }

    handleClose = () => {
        this.setState({ anchorEl: null ,anchorHidden:null,});
    };

    showHiddenPath = (e) => {
        this.setState({ anchorHidden: e.currentTarget });
    }

    add = () => {
        this.props.navigateToPath("/"+this.state.folders.join("/")+"/ss");
    }
    
    
    render() {

        const { classes} = this.props;

        let presentFolderMenu = (<Menu
            id="presentFolderMenu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
            disableAutoFocusItem={true}
            >
                <MenuItem onClick={this.add}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </Menu>);

        return (
             <div className={classes.container}>
                <div className={classes.navigatorContainer}>
                    <div className={classes.nav} ref={this.element}>
                        <span>           
                            <Button component="span" onClick={()=>this.navigateTo(-1)}>
                                /
                            </Button>
                            <RightIcon className={classes.rightIcon}/>
                        </span>
                        {this.state.hiddenMode && 
                            <span>
                                <Button title="显示路径" component="span" onClick={this.showHiddenPath}>
                                    <MoreIcon/>     
                                </Button>
                                <Menu
                                    id="hiddenPathMenu"
                                    anchorEl={this.state.anchorHidden}
                                    open={Boolean(this.state.anchorHidden)}
                                    onClose={this.handleClose}
                                    disableAutoFocusItem={true}
                                >
                                    {this.state.folders.slice(0,-1).map((folder,id)=>(
                                        <MenuItem onClick={(e)=>this.navigateTo(e,id)}>
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText inset primary={folder} />
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <RightIcon className={classes.rightIcon}/>
                                <Button component="span" onClick={(e)=>this.navigateTo(e,this.state.folders.length-1)}>
                                    {this.state.folders.slice(-1)}  
                                    <ExpandMore className={classes.expandMore}/>
                                </Button>
                                {presentFolderMenu}           
                            </span>
                        }
                        {!this.state.hiddenMode && this.state.folders.map((folder,id,folders)=>(
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
                                        presentFolderMenu
                                        }
                                    {(id !== folders.length-1) && <RightIcon className={classes.rightIcon}/>}
                                </span> 
                                }          
                            
                            </span>
                        ))}
                    
                    </div>
                    <div className={classes.optionContainer}>
                    <IconButton aria-label="Delete" >
                        <FolderIcon fontSize="small" />
                    </IconButton>
                    </div>
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