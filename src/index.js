import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import cloureveApp from './reducers'

const defaultStatus = {
    navigator:{
        path:"/",
        refresh:true,
    },
    viewUpdate:{
        open:true,
        explorerViewMethod: "icon",
        sortMethod:"namePos",
        contextType:"none",  
        menuOpen:false,
        navigatorLoading:true,
        navigatorError:false,
        navigatorErrorMsg:null,
        modalsLoading:false,
        modals:{
            createNewFolder:false,
        },
        snackbar:{
            toggle:false,
            vertical:"top",
            horizontal:"center",
            msg:"",
            color:"",
        }
    },
    explorer:{
        fileList:[],
        dirList:[
        ],
        selected:[],
        selectProps:{
            isMultiple:false,
            withFolder:false,
            withFile:false,
        }
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
