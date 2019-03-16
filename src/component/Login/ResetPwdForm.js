import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import KeyIcon from '@material-ui/icons/VpnKeyOutlined';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { toggleSnackbar, } from "../../actions/index"
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
const styles = theme => ({
    layout: {
        width: 'auto',
        marginTop: '110px',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    link: {
        marginTop: "10px",
        display:"flex",
        width: "100%",
        justifyContent: "space-between",
    },
    captchaContainer:{
        display:"flex",
        marginTop: "10px",
    }
})
const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSnackbar: (vertical, horizontal, msg, color) => {
            dispatch(toggleSnackbar(vertical, horizontal, msg, color))
        },
    }
}

class ResetPwdFormCompoment extends Component {

    state={
        pwd:"",
        pwdRepeat:"",
        loading:false,
    }

    login = e=>{
        e.preventDefault();
        if(this.state.pwdRepeat !== this.state.pwd){
            this.props.toggleSnackbar("top","right","两次密码输入不一致","warning");
            return;
        }
        this.setState({
            loading:true,
        });
        axios.post('/Member/Reset',{
            pwd:this.state.pwd,
            key:window.resetKey,
        }).then( (response)=> {
            if(response.data.code!=="200"){
                this.setState({
                    loading:false,
                });
                this.props.toggleSnackbar("top","right",response.data.message,"warning");
            }else{
                this.setState({
                    loading:false,
                    pwd:"",
                    pwdRepeat:"",
                });
                this.props.toggleSnackbar("top","right","密码重设成功","success");
            }
        })
        .catch((error) =>{
            this.setState({
                loading:false,
            });
            this.props.toggleSnackbar("top","right",error.message,"error");
            
            
        });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    

    render() {
        const { classes } = this.props;


        return (
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <KeyIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        找回密码
                    </Typography>
                    <form className={classes.form} onSubmit={this.login}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">新密码</InputLabel>
                            <Input 
                            id="pwd" 
                            type="password" 
                            name="pwd" 
                            onChange={this.handleChange("pwd")} 
                            autoComplete
                            value={this.state.pwd}
                            autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">重复新密码</InputLabel>
                            <Input 
                            id="pwdRepeat" 
                            type="password" 
                            name="pwdRepeat" 
                            onChange={this.handleChange("pwdRepeat")} 
                            autoComplete
                            value={this.state.pwdRepeat}
                            autoFocus />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={this.state.loading}
                            className={classes.submit}
                        >
                            重设密码
                        </Button>  </form>                          <Divider/>
                        <div className={classes.link}>
                            <div>
                                <Link href={"/Login"}>
                                    返回登录
                                </Link>
                            </div>
                            <div>
                                <Link href={"/SignUp"}>
                                    注册账号
                                </Link>
                            </div>
                        </div>
                    
                </Paper>
            </div>
        );
    }

}

const ResetPwdForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ResetPwdFormCompoment))

export default ResetPwdForm
