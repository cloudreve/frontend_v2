const viewUpdate = (state = [], action) => {
    switch (action.type) {
        case 'DRAWER_TOGGLE':
            return Object.assign({}, state, {
                open: action.open
            });
        case 'CHANGE_VIEW_METHOD':
            return Object.assign({}, state, {
                explorerViewMethod: action.method
            });
        case 'CHANGE_SORT_METHOD':
            return Object.assign({}, state, {
                sortMethod: action.method
            });
        case 'CHANGE_CONTEXT_MENU':
            return Object.assign({}, state, {
                contextType: action.menuType
            });
        default:
            return state
    }
  }
  
  export default viewUpdate