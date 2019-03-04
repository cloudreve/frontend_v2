import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux'

import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import VideoIcon from '@material-ui/icons/VideoLibrary';
import MusicIcon from '@material-ui/icons/LibraryMusic';
import ImageIcon from '@material-ui/icons/Collections';
import DocIcon from '@material-ui/icons/FileCopy';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import LockIcon from '@material-ui/icons/Lock';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import BackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import OpenFolderIcon from '@material-ui/icons/FolderOpen'
import RenameIcon from '@material-ui/icons/BorderColor'
import MoveIcon from '@material-ui/icons/Input'
import DeleteIcon from '@material-ui/icons/Delete'

import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UploadIcon from '@material-ui/icons/CloudUpload';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';

import {
    drawerToggleAction,
    setSelectedTarget,
    navitateTo,
    openCreateFolderDialog,
} from "../actions/index"
import Uploader from "./Uploader.js"

const drawerWidth = 240;

const mapStateToProps = state => {
    return {
        desktopOpen: state.viewUpdate.open,
        selected:state.explorer.selected,
        isMultiple:state.explorer.selectProps.isMultiple,
        withFolder:state.explorer.selectProps.withFolder,
        withFile:state.explorer.selectProps.withFile,
        path:state.navigator.path, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDesktopToggle: open => {
            dispatch(drawerToggleAction(open))
        },
        setSelectedTarget:targets=>{
            dispatch(setSelectedTarget(targets))
        },
        navitateTo:path => {
            dispatch(navitateTo(path))
        },
        openCreateFolderDialog:()=>{
            dispatch(openCreateFolderDialog())
        }
    }
}

const styles = theme => ({
    appBar: {
        marginLeft: drawerWidth,
        zIndex: theme.zIndex.drawer + 1,
        transition:" background-color 250ms" ,
    },

    drawer: {
            width: 0,
            flexShrink: 0,
    },
    drawerDesktop:{
        width: drawerWidth,
        flexShrink: 0,
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    menuButtonDesktop:{
        marginRight: 20,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    menuIcon:{
        marginRight: 20,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper:{
        width:drawerWidth,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0,
    
      },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    hiddenButton: {
        display: "none",
    },
    grow: {
        flexGrow: 1,
    },
    badge: {
        top: 1,
        right:-15,

    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    search: {
        [theme.breakpoints.down('sm')]: {
            display:"none",
        },
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 7.2,
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 7,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
      sectionForFile:{
            display: 'none',
            [theme.breakpoints.up('md')]: {
            display: 'flex',
            },
      },
});
class NavbarCompoment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            queued: 0,
            shareOpen:0,
        };
        this.UploaderRef = React.createRef();
    }



    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleShareClick = () => {
        this.setState(state => ({ shareOpen: !state.shareOpen }));
    }

    clickUpload = () => {
        if (this.state.queued === 0) {
            document.getElementsByClassName("uploadForm")[0].click();
        } else {
            this.UploaderRef.current.getWrappedInstance().openFileList();
        }
    }

    updateQueueStatus = (queued) => {
        this.setState({ queued: queued });
    }

    loadUploader() {
        if (true) {
            return (<Uploader queueChange={queued => this.updateQueueStatus(queued)} ref={this.UploaderRef} />)
        }
    }

    render() {
        const { classes } = this.props;

        const drawer = (
            <div id="container">

                <List>
                    <ListItem button key="上传文件" ref="s" onClick={this.clickUpload}>

                        <ListItemIcon>
                            <Badge badgeContent={this.state.queued} className={classes.badge} invisible={this.state.queued === 0} color="secondary">
                                <UploadIcon />
                            </Badge>
                        </ListItemIcon>

                        <ListItemText primary="上传文件" />
                    </ListItem>

                    <ListItem button key="新建目录" onClick={this.props.openCreateFolderDialog }>
                        <ListItemIcon>
                        <Badge className={classes.badge} invisible={1} color="secondary">
                                <NewFolderIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="新建目录" />
                    </ListItem>

                    <ListItem button id="pickfiles" className={classes.hiddenButton}>
                        <ListItemIcon><UploadIcon /></ListItemIcon>
                        <ListItemText />
                    </ListItem>
                </List>

                <Divider />

                <ListItem button key="视频" >
                    <ListItemIcon>
                        <Badge className={classes.badge} invisible={1} color="secondary">
                            <VideoIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="视频" />
                </ListItem>

                <ListItem button key="图片" >
                    <ListItemIcon>
                        <Badge className={classes.badge} invisible={1} color="secondary">
                            <ImageIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="图片" />
                </ListItem>

                <ListItem button key="音频" >
                    <ListItemIcon>
                        <Badge className={classes.badge} invisible={1} color="secondary">
                            <MusicIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="音频" />
                </ListItem>

                <ListItem button key="文档" >
                    <ListItemIcon>
                        <Badge className={classes.badge} invisible={1} color="secondary">
                            <DocIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="文档" />
                </ListItem>

                <Divider />

                <ListItem button key="我的分享"  onClick={this.handleShareClick}>
                    <ListItemIcon>
                        <Badge className={classes.badge} invisible={1} color="secondary">
                            <ShareIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText inset primary="我的分享" />
                    {this.state.shareOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.shareOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <LockIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="私密分享" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <EyeIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="公开分享" />
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <List>

                </List></div>
        );

        return (
            <div>
                <AppBar position="fixed" className={classes.appBar} color={(this.props.selected.length ===0)?"primary":"default"}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        {(this.props.selected.length ===0)&&<IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={()=>this.props.handleDesktopToggle(!this.props.desktopOpen)}
                            className={classes.menuButtonDesktop}
                        >
                            <MenuIcon />
                        </IconButton>}
                        {(this.props.selected.length !==0)&&
                            <Grow in={(this.props.selected.length !==0)}>
                                <IconButton
                                    color="inherit"
                                    className={classes.menuIcon}
                                    onClick = {()=>this.props.setSelectedTarget([])}
                                >
                                    <BackIcon />
                                </IconButton>
                            </Grow>
                        }
                        {(this.props.selected.length ===0)&&
                        <Typography variant="h6" color="inherit" noWrap>
                            Cloudreve
        				</Typography>
                        }

                        {(this.props.selected.length ===1)&&
                        <Typography variant="h6" color="inherit" noWrap>
                            {this.props.selected[0].name}
        				</Typography>
                        }

                        {(this.props.selected.length >1)&&
                        <Typography variant="h6" color="inherit" noWrap>
                            {this.props.selected.length}个对象
        				</Typography>
                        }
                        {(this.props.selected.length ===0)&&
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="搜索..."
                                    classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                    }}
                                />
                            </div>
                        }
                        <div className={classes.grow} />
                        {this.props.selected.length!==0&&
                            <div className={classes.sectionForFile}>
                                {(!this.props.isMultiple && this.props.withFolder)&&
                                    <Grow in={(!this.props.isMultiple && this.props.withFolder)}>
                                        <Tooltip title="进入目录">
                                            <IconButton color="inherit"
                                                onClick = {()=>this.props.navitateTo(this.props.path+this.props.selected[0].name)}
                                            >
                                                <OpenFolderIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grow>
                                }
                                {(!this.props.isMultiple)&&
                                    <Grow in={(!this.props.isMultiple)}>
                                        <Tooltip title="分享">
                                            <IconButton color="inherit">
                                                <ShareIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grow>
                                }
                                {(!this.props.isMultiple)&&
                                    <Grow in={(!this.props.isMultiple)}>
                                        <Tooltip title="重命名">
                                            <IconButton color="inherit">
                                                <RenameIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grow>
                                }
                                <Grow in={(this.props.selected.length!==0)}>
                                    <Tooltip title="移动">
                                        <IconButton color="inherit">
                                            <MoveIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Grow>
                                <Grow in={(this.props.selected.length!==0)}>
                                    <Tooltip title="删除">
                                        <IconButton color="inherit">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Grow>
                                
                            </div>
                        }
                    </Toolbar>
                </AppBar>
                {this.loadUploader()}

                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            anchor="left"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classNames({
                                    [classes.drawerOpen]: this.props.desktopOpen,
                                    [classes.drawerClose]: !this.props.desktopOpen,
                                  }),
                            }}
                            className={classNames(classes.drawer, {
                                [classes.drawerOpen]: this.props.desktopOpen,
                                [classes.drawerClose]: !this.props.desktopOpen,
                            })}
                            variant="persistent"
                            anchor="left"
                            open={this.props.desktopOpen}
                        ><div className={classes.toolbar} />
                            {drawer}
                        </Drawer>
                    </Hidden>
        
            </div>
        );
    }

}
NavbarCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
};

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps
  )( withStyles(styles)(NavbarCompoment))
  
export default Navbar