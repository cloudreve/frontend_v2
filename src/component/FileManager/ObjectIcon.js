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

import Folder from "./Folder"
import FileIcon from "./FileIcon"
import SmallIcon from "./SmallIcon"

const styles = theme => ({
    container: {
        padding: "7px",
    },
})

const mapStateToProps = state => {
    return {
        path: state.navigator.path,
        selected: state.explorer.selected,
        viewMethod:state.viewUpdate.explorerViewMethod,
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


class ObjectCompoment extends Component {

    state = {
    }

    contextMenu = (e) => {
        e.preventDefault();
        if ((this.props.selected.findIndex((value) => {
            return value === this.props.file;
        })) === -1) {
            this.props.setSelectedTarget([this.props.file]);
        }
        this.props.ContextMenu("file", true);
    } 

    selectFile = (e) => {
        let presentIndex = this.props.selected.findIndex((value) => {
            return value === this.props.file;
        });
        if (presentIndex !== -1 && e.ctrlKey) {
            this.props.removeSelectedTarget(presentIndex);
        } else {
            if (e.ctrlKey) {
                this.props.addSelectedTarget(this.props.file);
            } else {
                this.props.setSelectedTarget([this.props.file]);
            }
        }
    } 

    handleClick=(e)=> {
        this.selectFile(e);
    }

    handleDoubleClick() {
        if(this.props.file.type==="dir"){
            this.enterFolder();
            return;
        }
        
    }

    enterFolder = ()=>{ 
        this.props.navitateTo(this.props.path==="/"?this.props.path+this.props.file.name:this.props.path+"/"+this.props.file.name );
    }

    render() {

        const { classes } = this.props;

        const isSelected = (this.props.selected.findIndex((value) => {
            return value === this.props.file;
        })) !== -1;

        return (
            <div className={classes.container}>
                <div
                    onContextMenu={this.contextMenu}
                    onClick={this.handleClick} 
                    onDoubleClick = {this.handleDoubleClick.bind(this)}
                >
                    {(this.props.file.type==="dir") &&
                        <Folder folder={this.props.file}/>
                    }
                    {((this.props.file.type==="file") && this.props.viewMethod == "icon") &&
                        <FileIcon file={this.props.file}/>
                    }
                    {((this.props.file.type==="file") && this.props.viewMethod == "smallIcon") &&
                        <SmallIcon file={this.props.file}/>
                    }
                </div>
            </div>
        );
    }
}

ObjectCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
};


const ObjectIcon = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ObjectCompoment))

export default ObjectIcon