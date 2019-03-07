import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import { 
    toggleSnackbar,
}from "../../actions/index"
import {imgPreviewSuffix} from "../../config"
import PhotoSwipe from'react-photoswipe';
import('react-photoswipe/lib/photoswipe.css')

const styles = theme => ({
})

const mapStateToProps = state => {
    return {
        first:state.explorer.imgPreview.first,
        other:state.explorer.imgPreview.other,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSnackbar:(vertical,horizontal,msg,color)=>{
            dispatch(toggleSnackbar(vertical,horizontal,msg,color))
        },
    }
}

class ImgPreviewCompoment extends Component {

    state = {
        first:[],
        items:[],
        open:false,
        loaded:false,
    }

    options={
        history: false,
				focus: false,
				showAnimationDuration: 5,
				hideAnimationDuration: 0,
				bgOpacity: 0.8,
				closeOnScroll: 0,
    };

    componentWillReceiveProps = (nextProps)=>{
        let items = [];
        if(this.props.first!==nextProps.first){
            if(!this.state.loaded){
                this.setState({
                    loaded:true,
                })
            }
            nextProps.other.map((value)=>{
                let fileType =value.name.split(".").pop().toLowerCase();
                if(imgPreviewSuffix.indexOf(fileType)!==-1){
                    items.push({
                        h:0,
                        w:0,
                        title:value.name,
                        src:window.apiURL.preview+"?action=preview&path="+encodeURIComponent(value.path==="/"?value.path+value.name:value.path+"/"+value.name),
                    });
                };
            });
            console.log(items);
            this.setState({
                items:items,
                open:true,
            });
           
        }
    }

    handleClose=()=>{

    }

    setSize = (ps,index,item)=>{
        if (item.h < 1 || item.w < 1) {
            let img = new Image()
            img.onload = () => {
                item.w = img.width
                item.h = img.height
                ps.invalidateCurrItems()
                ps.updateSize(true)
            }
            img.src = item.src
        }
    }

    render() {

        const { classes } = this.props;

        if(this.state.loaded){
            return (
               <div>
                  <PhotoSwipe isOpen={this.state.open} items={this.state.items} options={this.options} onClose={this.handleClose} imageLoadComplete={this.setSize}/>
               </div>
            );
        }else{
            return (<div></div>);
        }
        
    }
}

ImgPreviewCompoment.propTypes = {
    classes: PropTypes.object.isRequired,
};


const ImgPreivew = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ImgPreviewCompoment))

export default ImgPreivew