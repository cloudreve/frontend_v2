import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {navitateTo,changeContextMenu} from "../../actions/index"
import ObjectIcon from "./ObjectIcon"
import ContextMenu from "./ContextMenu"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper'
import EmptyIcon from "@material-ui/icons/Unarchive"
import { trackWindowScroll }
  from 'react-lazy-load-image-component';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin:"10px",

    },
    root: {
        flexGrow: 1,
        padding:"10px",
    },
    typeHeader:{
        margin: "10px 25px",
        color: "#6b6b6b",
        fontWeight: "500",
    },
    loading:{
        justifyContent: "center",
        display: "flex",
        marginTop:"40px",
    },
    errorBox:{
        padding: theme.spacing.unit * 4,
    },
    errorMsg:{
        marginTop:"10px",
    },
    emptyContainer:{
        bottom: "0",
        height: "300px",
        margin: "50px auto",
        width: "300px",
        color: theme.palette.explorer.emptyIcon,
        textAlign: "center",
        paddingTop: "20px", 
    },
    emptyIcon:{
        fontSize: "160px", 
    },
    emptyInfoBig:{
        fontSize: "25px",
        color:theme.palette.text.disabled,
    },
    emptyInfoSmall:{
        color:theme.palette.text.hint,
    }
})

const mapStateToProps = state => {
    return {
        path: state.navigator.path,
        drawerDesktopOpen:state.viewUpdate.open,
        viewMethod:state.viewUpdate.explorerViewMethod,
        sortMethod:state.viewUpdate.sortMethod,
        fileList:state.explorer.fileList,
        dirList:state.explorer.dirList,
        loading:state.viewUpdate.navigatorLoading,
        navigatorError:state.viewUpdate.navigatorError,
        navigatorErrorMsg:state.viewUpdate.navigatorErrorMsg,
    }
}
let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const mapDispatchToProps = dispatch => {
    return {
        navigateToPath: path => {
            dispatch(navitateTo(path))
        },
        
        changeContextMenu: (type,open) => {
            dispatch(changeContextMenu(type,open))
        }
    }
}

class ExplorerCompoment extends Component {
    
    contextMenu = (e) => {
        e.preventDefault();
        if(!this.props.loading){
            this.props.changeContextMenu("empty",true);
        }
        
    }

    render() {
        
        const { classes} = this.props;
        
        return (
            <div 
            className={classes.root} 
            onContextMenu = {this.contextMenu}
            
            >
                <ContextMenu/>
                {this.props.navigatorError&&
                    <Paper  elevation={1} className={classes.errorBox}>
                    <Typography variant="h5" component="h3">
                        :(  请求时出现错误
                    </Typography>
                    <Typography color={"textSecondary"} className={classes.errorMsg}>{this.props.navigatorErrorMsg.message}</Typography>
                    </Paper>
                }
                
                {(this.props.loading && !this.props.navigatorError) &&
                    <div className={classes.loading}>
                        <CircularProgress />
                    </div>
                }
                {(this.props.dirList.length===0&&this.props.fileList.length===0&&!this.props.loading&&!this.props.navigatorError)&&
                    <div className={classes.emptyContainer}>
                       <EmptyIcon className={classes.emptyIcon}/> 
                       <div className={classes.emptyInfoBig}>拖拽文件至此</div>
                       <div className={classes.emptyInfoSmall}>或点击左侧“上传文件”按钮添加文件</div>

                    </div>
                }
                {(this.props.viewMethod!=="list" &&this.props.dirList.length!==0&&!this.props.loading)&&
                    <div>
                        {(this.props.dirList.length!==0 && !this.props.loading)&&
                            <div>
                                <Typography className={classes.typeHeader}>文件夹</Typography>
                                <Grid container spacing={0}
                                alignItems="flex-start"
                                >
                                    {this.props.dirList.map((value,index)=>(
                                        <Grid item xs={6} md={3} sm={4} lg={2}>
                                            <ObjectIcon file={value}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        }
                        {(this.props.fileList.length!==0 && !this.props.loading)&&
                            <div>
                                <Typography className={classes.typeHeader}>文件</Typography>
                                <Grid container spacing={0}
                                alignItems="flex-start"
                                >
                                    {this.props.fileList.map((value,index)=>(
                                        <Grid item xs={6} md={3} sm={4} lg={2}>
                                            <ObjectIcon file={value}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        }
                        </div>
                }

                {(this.props.viewMethod==="list" &&this.props.dirList.length!==0&&!this.props.loading)&&
                    <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat (g)</TableCell>
                        <TableCell align="right">Carbs (g)</TableCell>
                        <TableCell align="right">Protein (g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                }
               
                
            </div>
        );
    }
}

ExplorerCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
    path:PropTypes.string.isRequired,
};


const Explorer = connect(
    mapStateToProps,
    mapDispatchToProps
  )( withStyles(styles)(ExplorerCompoment))  
  
export default Explorer