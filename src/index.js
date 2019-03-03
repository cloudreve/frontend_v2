import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import cloureveApp from './reducers'

const defaultStatus = {
    navigator:{
        path:"/我的视频/MSC纳新/2018"
    },
    viewUpdate:{
        open:true,
        explorerViewMethod: "icon",
        sortMethod:"namePos",
        contextType:"none",
    },
    explorer:{
        fileList:[],
        dirList:[
            {"name":"目录1","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
            {"name":"目录2","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
            {"name":"目录目录3目录3目录3目录3目录33","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
            {"name":"目录4","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
            {"name":"目录5","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
            {"name":"目录6","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
            {"name":"目录7","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
            {"name":"目录8","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
            {"name":"目录9","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
            {"name":"目录10","size":"0","date":"2019-03-02 14:41:46","type":"dir","name2":"","id":32,"pic":""},
        ],
        selected:[],
    }
};

let store = createStore(cloureveApp,defaultStatus)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
