import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

import FileList from "./Upload/FileList.js"

let loaded = false;

class Uploader extends Component {

    constructor(props){
        super(props);
        this.fileList = React.createRef();
    }

    FilesAdded (up, files) {
        this.fileList.current.openFileList();
    }


    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
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
                        'FilesAdded':(up,file)=>this.FilesAdded,
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function (up, file) {
                        },
                        'FileUploaded': function (up, file, info) {
                            var progress = new window.FileProgress(file, 'fsUploadProgress');
                            progress.setComplete(up, info);
                        },
                        'Error': function (up, err, errTip) {
                            var progress = new window.FileProgress(err.file, 'fsUploadProgress');
                            progress.setError();
                            progress.setStatus(errTip);
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


    render() { return (<div><FileList  innerRef={this.fileList}/></div>); }

}

export default scriptLoader(
    ['http://127.0.0.1/static/new/dev/moxie.js'],
    ['http://127.0.0.1/static/new/dev/plupload.dev.js'],
    ['http://127.0.0.1/static/new/dev/i18n/zh_CN.js'],
    ['http://127.0.0.1/static/new/dev/ui.js'],
    ['http://127.0.0.1/static/new/dev/qiniu.js'],

)(Uploader)