import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import Navigator from "./Navigator.js"
import Explorer from "./Explorer.js"

const styles = theme => ({

})

class FileManager extends Component {
    
    render() {
        return (
             <div>
                <Navigator/>
                <Explorer/>
             </div>
        );
    }

}

FileManager.propTypes = {
};

export default withStyles(styles)(FileManager);