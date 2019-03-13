import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { toggleSnackbar,}from "../actions/index"
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    layout: {
        width: 'auto',
        marginTop:'50px',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up("sm")]: {
          width: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    userNav:{
        height:"270px",
        backgroundColor: theme.palette.primary.main,
        padding: "20px 20px 2em",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='"+theme.palette.primary.light.replace("#","%23")+"' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='"+theme.palette.primary.dark.replace("#","%23")+"' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='"+theme.palette.secondary.main.replace("#","%23")+"' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='"+theme.palette.secondary.dark.replace("#","%23")+"' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='"+theme.palette.secondary.light.replace("#","%23")+"' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='"+theme.palette.secondary.main.replace("#","%23")+"' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='"+theme.palette.primary.dark.replace("#","%23")+"' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='"+theme.palette.primary.main.replace("#","%23")+"' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='"+theme.palette.secondary.light.replace("#","%23")+"' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='"+theme.palette.secondary.dark.replace("#","%23")+"' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='"+theme.palette.secondary.main.replace("#","%23")+"' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='"+theme.palette.secondary.dark.replace("#","%23")+"' points='943 900 1210 900 971 687'/%3E%3C/svg%3E\")",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
    },
    avatarContainer:{
        height: "80px",
        width: "80px",
        borderRaidus:"50%",
        margin: "auto",
        marginTop: "50px",
        boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
        border: "2px solid #fff",
    },
    nickName:{
        width: "200px",
        margin: "auto",
        textAlign: "center",
        marginTop: "1px",
        fontSize: "25px",
        color: "#ffffffcf",
    }

})
const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {

    return {
        toggleSnackbar:(vertical,horizontal,msg,color)=>{
            dispatch(toggleSnackbar(vertical,horizontal,msg,color))
        },
    }
}

class ProfileCompoment extends Component {

    state={
        listType:0,
    }

    handleChange = (event, listType) => {
        this.setState({ listType });
    };    

    render() {
        const { classes } = this.props;
      

        return (
            <div className={classes.layout}>
                <Paper square>
                    <div className={classes.userNav}>
                        <div >
                            <Avatar className={classes.avatarContainer} src ={"/Member/Avatar/"+window.taegetUserInfo.uid+"/l"}></Avatar>
                        </div>
                        <div>
                            <Typography className={classes.nickName} noWrap>{window.taegetUserInfo.nickname}</Typography>
                        </div>
                    </div>
                    <Tabs
                        value={this.state.listType}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleChange}
                        centered
                    >
                    <Tab label="全部分享" />
                    <Tab label="热门分享"/>
                    <Tab label="个人资料" />
                    </Tabs>
                </Paper>
            </div>
        );
    }

}

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)( withStyles(styles)(ProfileCompoment))
  
export default Profile
