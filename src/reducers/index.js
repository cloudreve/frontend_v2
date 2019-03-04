const checkSelectedProps = (state)=>{
    let isMultiple,withFolder,withFile=false;
    isMultiple = (state.selected.length>1);
    state.selected.map((value)=>{
        if(value.type==="dir"){
            withFolder = true;
        }else if(value.type==="file"){
            withFile = true;
        }
    })
    return [isMultiple,withFolder,withFile];
}

const cloudreveApp = (state = [], action) => {
    switch (action.type) {
        case 'DRAWER_TOGGLE':
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                    open:action.open,
                }),
            });
        case 'CHANGE_VIEW_METHOD':
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                    explorerViewMethod:action.method,
                }),
            });
        case 'CHANGE_SORT_METHOD':
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                    sortMethod:action.method,
                }),
            });
        case 'CHANGE_CONTEXT_MENU':
            if(state.viewUpdate.contextOpen && action.open){
                return Object.assign({}, state);
            }
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                contextOpen: action.open,
                contextType:action.menuType,
                }),
            });
        case 'SET_NAVIGATOR_LOADING_STATUE':
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                    navigatorLoading:action.status,
                }),
            });
        case 'SET_NAVIGATOR_ERROR':
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                    navigatorError: action.status,
                    navigatorErrorMsg: action.msg,
                }),
            });
        case 'UPDATE_FILE_LIST':
            var dirList =  action.list.filter(function (x) {
                return x .type === "dir";
            });
            return Object.assign({}, state, {
                explorer: Object.assign({}, state.explorer, {
                    fileList: action.list,
                    dirList: dirList,
                }),
            });
        case 'ADD_SELECTED_TARGET':
            var newState =  Object.assign({}, state, {
                explorer:Object.assign({}, state.explorer, {
                    selected: [...state.explorer.selected,action.targets]
                }),
            });
            var selectedProps = checkSelectedProps(newState.explorer);
            return Object.assign({}, newState, {
                explorer:Object.assign({}, newState.explorer, {
                    selectProps: {
                        isMultiple:selectedProps[0],
                        withFolder:selectedProps[1],
                        withFile:selectedProps[2],
                    }
                }),
            });
        case 'SET_SELECTED_TARGET':
            var newState =  Object.assign({}, state, {
                explorer:Object.assign({}, state.explorer, {
                    selected: action.targets
                }),
            });
            var selectedProps = checkSelectedProps(newState.explorer);
            return Object.assign({}, newState, {
                explorer:Object.assign({}, newState.explorer, {
                    selectProps: {
                        isMultiple:selectedProps[0],
                        withFolder:selectedProps[1],
                        withFile:selectedProps[2],
                    }
                }),
            });
        case 'RMOVE_SELECTED_TARGET':
            var oldSelected = state.explorer.selected.concat();
            oldSelected.splice(action.id,1);
            var newState =  Object.assign({}, state, {
                explorer:Object.assign({}, state.explorer, {
                    selected: oldSelected
                }),
            });
            var selectedProps = checkSelectedProps(newState.explorer);
            return Object.assign({}, newState, {
                explorer:Object.assign({}, newState.explorer, {
                    selectProps: {
                        isMultiple:selectedProps[0],
                        withFolder:selectedProps[1],
                        withFile:selectedProps[2],
                    }
                }),
            });
        case 'NAVIGATOR_TO':
            return Object.assign({}, state, {
                navigator:Object.assign({}, state.navigator, {
                    path: action.path
                }),
                viewUpdate:Object.assign({}, state.viewUpdate, {
                    contextOpen:false,
                    navigatorError:false,
                    navigatorLoading:true,
                }),
                explorer:Object.assign({}, state.explorer, {
                    selected:[],
                }),
            });
        case 'OPEN_CREATE_FOLDER_DIALOG':
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                    modals: Object.assign({}, state.viewUpdate.modals, {
                        createNewFolder:true,
                    }),
                    contextOpen:false,
                }),
            });
        case 'CLOSE_ALL_MODALS': 
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                    modals: Object.assign({}, state.viewUpdate.modals, {
                        createNewFolder:false,
                    }),
                }),
            });
        case 'TOGGLE_SNACKBAR':
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                    snackbar:{
                        toggle:!state.viewUpdate.snackbar.toggle,
                        vertical:action.vertical,
                        horizontal:action.horizontal,
                        msg:action.msg,
                        color:action.color,
                    },
                }),
            });
        case 'SET_MODALS_LOADING':
            return Object.assign({}, state, {
                viewUpdate: Object.assign({}, state.viewUpdate, {
                    modalsLoading:action.status,
                }),
            });
        case 'REFRESH_FILE_LIST':
            return Object.assign({}, state, {
                navigator: Object.assign({}, state.navigator, {
                    refresh:!state.navigator.refresh,
                }),
            });
        default:
            return state
    }
  }
  
  
export default cloudreveApp