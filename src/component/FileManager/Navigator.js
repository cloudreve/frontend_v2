import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import TextTotateVerticalIcon from '@material-ui/icons/TextRotateVertical'
import FolderIcon from '@material-ui/icons/Folder'
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import {navitateTo,changeViewMethod,changeSortMethod,setNavigatorError,updateFileList,setNavigatorLoadingStatus} from "../../actions/index"
import axios from 'axios'

const mapStateToProps = state => {
    return {
      path: state.navigator.path,
      drawerDesktopOpen:state.viewUpdate.open,
      viewMethod:state.viewUpdate.explorerViewMethod,
      sortMethod:state.viewUpdate.sortMethod,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        navigateToPath: path => {
            dispatch(navitateTo(path))
        },
        changeView:method=>{
            dispatch(changeViewMethod(method))
        },
        changeSort:method=>{
            dispatch(changeSortMethod(method))
        },
        setNavigatorError:(status,msg)=>{
            dispatch(setNavigatorError(status,msg))
        },
        updateFileList:list=>{
            dispatch(updateFileList(list))
        },
        setNavigatorLoadingStatus:status=>{
            dispatch(setNavigatorLoadingStatus(status))
        }
    }
}

const delay = (ms) => new Promise(  
    (resolve) => setTimeout(resolve, ms)  
);

const sortOptions = [
    "文件名称正序",
    "文件名称倒序",
    "上传时间正序",
    "上传时间到序",
];

const styles = theme => ({
    container:{
        [theme.breakpoints.down('xs')]: {
            display:"none",
        },
        height:"48px",
        overflow:"hidden",
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
        paddingTop: "6px",
        marginRight:"10px",
    },
    rightIcon:{
        marginTop: "6px",
        verticalAlign: "top",
        color:"#868686",
    },
    expandMore:{
        color:"#8d8d8d",
    },
    sideButton:{
        padding:"8px",
        marginRight:"5px",
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
        anchorSort:null,
        selectedIndex:0,
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
        var newPath = path!==null?path:this.props.path;
        axios.post('/File/ListFile', {
            action: 'list',
            path: newPath
        })
        .then( (response)=> {
            this.props.updateFileList(response.data.result);
            this.props.setNavigatorLoadingStatus(false);
        })
        .catch((error) =>{
            this.props.setNavigatorError(true,error);
        });
    }

    redresh = () => {
        this.props.setNavigatorLoadingStatus(true);
        this.renderPath();
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
        if(this.props.drawerDesktopOpen !== prevProps.drawerDesktopOpen){
            delay(500).then(() => this.checkOverFlow());
            
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
        if (id === this.state.folders.length-1){
            //最后一个路径
            this.setState({ anchorEl: event.currentTarget });
            return;
        }else if(id===-1 && this.state.folders.length === 1 && this.state.folders[0] === ""){
            this.redresh();
            this.handleClose();
            return;
        }else if (id === -1){
            this.props.navigateToPath("/");
            this.handleClose();
            return;
        }else{
            this.props.navigateToPath("/"+this.state.folders.slice(0,id+1).join("/"));
            this.handleClose();
        }
    }

    handleClose = () => {
        this.setState({ anchorEl: null ,anchorHidden:null,anchorSort:null});
    };

    showHiddenPath = (e) => {
        this.setState({ anchorHidden: e.currentTarget });
    }

    showSortOptions = (e) => {
        this.setState({ anchorSort: e.currentTarget });
    }

    add = () => {
        this.props.navigateToPath("/"+this.state.folders.join("/")+"/ss");
    }

    toggleViewMethod = () => {
        this.props.changeView(this.props.viewMethod==="icon"?"list":"icon");
    }

    handleMenuItemClick = (e,index) => {
        this.setState({ selectedIndex: index, anchorEl: null });
        let optionsTable = {
            0:"namePos",
            1:"nameRev",
            2:"timePos",
            3:"timeRev",
        };
        this.props.changeSort(optionsTable[index]);
        this.handleClose();
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
                            <Button component="span" onClick={(e)=>this.navigateTo(e,-1)}>
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
                            <span key={id}> 
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
                        {(this.props.viewMethod === "icon")&&
                            <IconButton title="列表展示" className={classes.sideButton} onClick={this.toggleViewMethod}>
                                <ViewListIcon fontSize="small" />
                            </IconButton>
                        }
                        {(this.props.viewMethod === "list")&&
                            <IconButton title="图标展示" className={classes.sideButton} onClick={this.toggleViewMethod}>
                                <ViewModuleIcon fontSize="small" />
                            </IconButton>
                        }
                        
                        <IconButton title="排序方式" className={classes.sideButton} onClick={this.showSortOptions}>
                            <TextTotateVerticalIcon fontSize="small" />
                        </IconButton>
                        <Menu
                            id="sort-menu"
                            anchorEl={this.state.anchorSort}
                            open={Boolean(this.state.anchorSort)}
                            onClose={this.handleClose}
                        >
                        {sortOptions.map((option, index) => (
                            <MenuItem
                            key={option}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index)}
                            >
                            {option}
                            </MenuItem>
                        ))}
                        </Menu>
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