import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import RightIcon from '@material-ui/icons/KeyboardArrowRight'

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

class Navigator extends Component {

    

    constructor(props) {
        super(props);
        this.element = React.createRef();
    }

    click=()=> {

        const hasOverflowingChildren = this.element.current.offsetHeight < this.element.current.scrollHeight ||
        this.element.current.offsetWidth < this.element.current.scrollWidth;
        alert(hasOverflowingChildren);
    }
    
    render() {

        const { classes } = this.props;

        return (
             <div className={classes.container}>
                <div className={classes.nav} ref={this.element}>
                    <Button component="span" onClick={this.click}>
                        /
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

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);