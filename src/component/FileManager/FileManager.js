import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import Navigator from "./Navigator.js"

const styles = theme => ({

})

class FileManager extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
             <div>
                <Navigator/>
             </div>
        );
    }

}

FileManager.propTypes = {
};

export default withStyles(styles)(FileManager);