import React, { Component } from 'react'
import scriptLoader from '../loader/index.js'

import FileList from "./Upload/FileList.js"

let loaded = false;

class Uploader extends Component {

    constructor(props) {
        super(props);
        this.state={
            queued:0,
        }
    }

    setRef(val){
        this.fileList=val;
    }

    cancelUpload(file){
        this.uploader.removeFile(file);
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.queued !== this.state.queued){
          this.props.queueChange(nextState.queued);
        }
        return false;
    }

    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                if(loaded){
                    return;
                }
                loaded = true;
                this.uploader = window.Qiniu.uploader({
                    runtimes: 'html5',
                    browse_button: 'pickfiles',
                    container: 'container',
                    drop_element: 'container',
                    max_file_size: window.uploadConfig.maxSize,
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
                            this.fileList["openFileList"]();
                            window.plupload.each(files, (files)=> {
                                this.fileList["enQueue"](files);
                           })
                        },
                            
                        
                        'BeforeUpload': function (up, file) {

                        },
                        "QueueChanged":(up=>{
                            this.setState({queued:up.total.queued});
                        }),
                        'UploadProgress': (up, file)=>{
                            this.fileList["updateStatus"](file);
                        },
                        'UploadComplete': (up, file)=>{
                            this.fileList["setComplete"](file[0]);
                        },
                        'FileUploaded': function (up, file, info) {
                           
                        },
                        'Error': (up, err, errTip)=>{
                            this.fileList["openFileList"]();
                            this.fileList["setError"](err.file,errTip);
                        },
                        "FilesRemoved":(up, files)=>{
                        },
                    }
                });
               // this.fileList["openFileList"]();
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

    openFileList=()=>{
        this.fileList["openFileList"]();
    };


    render() {
        return (
             <div>
                <FileList inRef= {this.setRef.bind(this)} cancelUpload={this.cancelUpload.bind(this)}/>
             </div>
        );
    }

}

export default scriptLoader(
    ['http://localhost/static/new/dev/moxie.js'],
    ['http://localhost/static/new/dev/plupload.dev.js'],
    ['http://localhost/static/new/dev/i18n/zh_CN.js'],
    ['http://localhost/static/new/dev/ui.js'],
    ['http://localhost/static/new/dev/qiniu.js'],

)(Uploader)