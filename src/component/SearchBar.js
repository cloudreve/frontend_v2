import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import FileIcon from '@material-ui/icons/InsertDriveFile'
import ShareIcon from '@material-ui/icons/Share'
import { connect } from 'react-redux'
import {
    searchMyFile,
}from "../actions/index"

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchMyFile:(keywords)=>{
            dispatch(searchMyFile(keywords));
        },
    }
}

const styles = theme => ({
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
          '&:focus': {
            width: 300,
          }
        },
      },
      suggestBox:{
        zIndex: "9999",
        width:364,
      }
})

class SearchBarCompoment extends Component {

    state = {
        anchorEl: null,
        input:"",
    };

    handleChange = (event)=>{
        const { currentTarget } = event;
        this.input = event.target.value;
        this.setState({
            anchorEl:currentTarget,
            input:event.target.value,
        });
    }

    cancelSuggest = ()=>{
        this.setState({
            input:"",
        });
    }

    searchMyFile = ()=>{
        this.props.searchMyFile(this.input);
    }

    searchShare = ()=>{
        window.location.href="/Explore/Search/"+this.input;
    }

    render() {

        const { classes} = this.props;
        const { anchorEl } = this.state;
        const id = this.state.input!=="" ? 'simple-popper' : null;

        return (
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
                    onChange={this.handleChange}
                    onBlur = {this.cancelSuggest}
                    value ={this.state.input}
                />
                <Popper id={id} open={this.state.input!==""} anchorEl={anchorEl} className={classes.suggestBox} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper
                            square={true}
                            >
                            {window.isHomePage&&
                            <MenuItem onClick={this.searchMyFile}>
                                <ListItemIcon className={classes.icon}>
                                    <FileIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} primary={<Typography noWrap>
                                        在我的文件中搜索 <strong>{this.state.input}</strong>
                                    </Typography>} />
                            </MenuItem>
                            }
                            
                            <MenuItem onClick={this.searchShare}>
                                <ListItemIcon className={classes.icon}>
                                    <ShareIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} primary={<Typography noWrap>
                                        在全站分享中搜索 <strong>{this.state.input}</strong>
                                    </Typography>} />
                            </MenuItem>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        );
    }
}

SearchBarCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
};

const SearchBar = connect(
    mapStateToProps,
    mapDispatchToProps
)( withStyles(styles)(SearchBarCompoment))
  
export default SearchBar