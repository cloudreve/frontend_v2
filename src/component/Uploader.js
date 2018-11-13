import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

import FileList from "./Upload/FileList.js"

let loaded = false;

class Uploader extends Component {

    constructor(props){
        super(props);
    }

    setRef(val){
        this.fileList=val;
    }

    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        this.fileList();
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                if(loaded){
                    return;
                }
                loaded = true;
                var uploader = window.Qiniu.uploader({
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles',
                    container: 'container',
                    drop_element: 'container',
                    max_file_size: window.uploadConfig.maxSize,
                    flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: window.ChunkSize,
                    filters: {
                        mime_types: window.uploadConfig.allowedType,
                    },
                    multi_selection: !(window.moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken_url: "/Upload/Token",
                    domain: "s",
                    get_new_uptoken: true,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'FilesAdded':({up, files})=>{
                            this.fileList.current.openFileList();
                            window.plupload.each(files, (files)=> {
                                this.fileList.current.enQueue(files);
                                console.log(files);
                           })
                        },
                            
                        
                        'BeforeUpload': function (up, file) {
                            alert("BeforeUpload");
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function (up, file) {
                        },
                        'FileUploaded': function (up, file, info) {
                           
                        },
                        'Error': function (up, err, errTip) {
                        
                        }
                    }
                });
            }
            else this.onError()
        }
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props
        if (isScriptLoaded && isScriptLoadSucceed) {
        }
        
    }

    onError(){

    }

    openFileList(){
        alert();
    }


    render() { return (<div><FileList inRef= {this.setRef.bind(this)}/></div>); }

}

export default scriptLoader(
    ['http://localhost/static/new/dev/moxie.js'],
    ['http://localhost/static/new/dev/plupload.dev.js'],
    ['http://localhost/static/new/dev/i18n/zh_CN.js'],
    ['http://localhost/static/new/dev/ui.js'],
    ['http://localhost/static/new/dev/qiniu.js'],

)(Uploader)