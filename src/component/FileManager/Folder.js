import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
    changeContextMenu,
    setSelectedTarget,
    addSelectedTarget,
    removeSelectedTarget,
    setNavigatorLoadingStatus,
    navitateTo,
} from "../../actions/index"
import { withStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder'
import classNames from 'classnames';
import { stat } from 'fs';

const styles = theme => ({
    container: {
        padding: "7px",
    },

    selected: {
        "&:hover": {
            border: "1px solid #d0d0d0",
        },
        backgroundColor: theme.palette.explorer.bgSelected,

    },

    notSelected: {
        "&:hover": {
            backgroundColor: "#f9f9f9",
            border: "1px solid #d0d0d0",
        },
        backgroundColor: theme.palette.background.paper,
    },

    button: {
        height: "50px",
        border: "1px solid #dadce0",
        width: "100%",
        borderRadius: "6px",
        boxSizing: "border-box",
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        display: "flex",
        justifyContent: "left",
        alignItems: "initial",
    },
    icon: {
        margin: "10px 10px 10px 16px",
        height: "30px",
        minWidth: "30px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "90%",
        paddingTop: "2px",
        color: theme.palette.explorer.icon,
    },
    folderNameSelected: {
        color: theme.palette.primary.dark,
        fontWeight: "500",
    },
    folderNameNotSelected: {
        color: theme.palette.explorer.filename,
    },
    folderName: {
        marginTop: "15px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        marginRight: "20px",
    }
})

const mapStateToProps = state => {
    return {
        path: state.navigator.path,
        selected: state.explorer.selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ContextMenu: (type, open) => {
            dispatch(changeContextMenu(type, open))
        },
        setSelectedTarget: targets => {
            dispatch(setSelectedTarget(targets))
        },
        addSelectedTarget: targets => {
            dispatch(addSelectedTarget(targets))
        },
        removeSelectedTarget: id => {
            dispatch(removeSelectedTarget(id));
        },
        setNavigatorLoadingStatus: status => {
            dispatch(setNavigatorLoadingStatus(status));
        },
        navitateTo:path => {
            dispatch(navitateTo(path))
        }
    }
}

let timer = 0;
let delay = 200;
let prevent = false;

class FolderCompoment extends Component {

    state = {
    }

    contextMenu = (e) => {
        e.preventDefault();
        if ((this.props.selected.findIndex((value) => {
            return value === this.props.folder;
        })) === -1) {
            this.props.setSelectedTarget([this.props.folder]);
        }
        this.props.ContextMenu("file", true);
    } 

    selectFile = (e) => {
        let presentIndex = this.props.selected.findIndex((value) => {
            return value === this.props.folder;
        });
        if (presentIndex !== -1 && e.ctrlKey) {
            this.props.removeSelectedTarget(presentIndex);
        } else {
            if (e.ctrlKey) {
                this.props.addSelectedTarget(this.props.folder);
            } else {
                this.props.setSelectedTarget([this.props.folder]);
            }
        }
    } 

    handleClick=(e)=> {
        this.selectFile(e);
    }

    handleDoubleClick() {
        this.enterFolder();
    }

    enterFolder = ()=>{ 
        this.props.navitateTo(this.props.path=="/"?this.props.path+this.props.folder.name:this.props.path+"/"+this.props.folder.name );
    }

    render() {

        const { classes } = this.props;

        const isSelected = (this.props.selected.findIndex((value) => {
            return value === this.props.folder;
        })) !== -1;

        return (
            <div className={classes.container}>
                <ButtonBase
                    focusRipple
                    className={classNames({
                        [classes.selected]: isSelected,
                        [classes.notSelected]: !isSelected,
                    }, classes.button)}
                    onContextMenu={this.contextMenu}
                    onClick={this.handleClick} 
                    onDoubleClick = {this.handleDoubleClick.bind(this)}
                >
                    <div className={classNames(classes.icon, {
                        [classes.iconSelected]: isSelected,
                        [classes.iconNotSelected]: !isSelected,
                    })}><FolderIcon /></div>
                    <Typography className={classNames(classes.folderName, {
                        [classes.folderNameSelected]: isSelected,
                        [classes.folderNameNotSelected]: !isSelected,
                    })}>{this.props.folder.name}</Typography>
                </ButtonBase>

            </div>
        );
    }
}

FolderCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
    folder: PropTypes.object.isRequired,
};


const Folder = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(FolderCompoment))

export default Folder