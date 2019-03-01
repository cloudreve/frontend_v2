import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

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
import Badge from '@material-ui/core/Badge';

import Uploader from "./Uploader.js"

const drawerWidth = 240;

const styles = theme => ({
    appBar: {
        marginLeft: drawerWidth,

        zIndex: theme.zIndex.drawer + 1,
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
    badge: {
        top: 1,
        right: -15,

    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});
class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            queued: 0,
            shareOpen:0,
            desktopOpen:true,
        };
        this.UploaderRef = React.createRef();
    }



    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleDesktopToggle = () => {
        this.setState(state => ({ desktopOpen: !state.desktopOpen }));
    }

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
                            <Badge badgeContent={this.state.queued} className={classes.badge} invisible={this.state.queued == 0} color="secondary">
                                <UploadIcon />
                            </Badge>
                        </ListItemIcon>

                        <ListItemText primary="上传文件" />
                    </ListItem>

                    <ListItem button key="新建目录" >
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
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDesktopToggle}
                            className={classes.menuButtonDesktop}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Cloudreve
        				</Typography>
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
                                    [classes.drawerOpen]: this.state.desktopOpen,
                                    [classes.drawerClose]: !this.state.desktopOpen,
                                  }),
                            }}
                            className={classNames(classes.drawer, {
                                [classes.drawerOpen]: this.state.desktopOpen,
                                [classes.drawerClose]: !this.state.desktopOpen,
                            })}
                            variant="persistent"
                            anchor="left"
                            open={this.state.desktopOpen}
                        ><div className={classes.toolbar} />
                            {drawer}
                        </Drawer>
                    </Hidden>
        
            </div>
        );
    }

}
Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);