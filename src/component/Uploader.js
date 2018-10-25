import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class Uploader extends Component {

    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
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
                        'FilesAdded': function (up, files) {
                            // $('table').show();
                            // $('#upload_box').show();
                            // $('#success').hide();
                            // $('#info_box').hide();

                            //   $.cookie('path', decodeURI(getCookieByString("path_tmp"))); 
                            // plupload.each(files, function(file) {
                            // 	var progress = new FileProgress(file, 'fsUploadProgress');
                            // 	progress.setStatus("等待...");
                            // 	progress.bindUploadCancel(up);
                            // });

                        },
                        'BeforeUpload': function (up, file) {
                            // var progress = new FileProgress(file, 'fsUploadProgress');
                            // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                            // if (up.runtime === 'html5' && chunk_size) {
                            // 	progress.setChunkProgess(chunk_size);
                            // }
                        },
                        'UploadProgress': function (up, file) {
                            // var progress = new FileProgress(file, 'fsUploadProgress');
                            // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                            // progress.setProgress(file.percent + "%", file.speed, chunk_size);
                        },
                        'UploadComplete': function (up, file) {
                            // $('#success').show();
                            // toastr["success"]("队列全部文件处理完毕");
                            // getMemory();
                        },
                        'FileUploaded': function (up, file, info) {
                            var progress = new window.FileProgress(file, 'fsUploadProgress');
                            progress.setComplete(up, info);
                        },
                        'Error': function (up, err, errTip) {
                            // $('#upload_box').show();
                            // 	$('table').show();
                            // 	$('#info_box').hide();
                            var progress = new window.FileProgress(err.file, 'fsUploadProgress');
                            progress.setError();
                            progress.setStatus(errTip);
                            //toastr["error"]("上传时遇到错误");
                        }
                    }
                });
            }
            else this.props.onError()
        }
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props
        if (isScriptLoaded && isScriptLoadSucceed) {
        }
    }
    render() { return (<div></div>); }

}

export default scriptLoader(
    ['http://lite.aoaoao.me/dev/moxie.js'],
    ['http://lite.aoaoao.me/dev/plupload.dev.js'],
    ['http://lite.aoaoao.me/dev/i18n/zh_CN.js'],
    ['http://lite.aoaoao.me/dev/ui.js'],
    ['http://lite.aoaoao.me/dev/qiniu.js'],

)(Uploader)