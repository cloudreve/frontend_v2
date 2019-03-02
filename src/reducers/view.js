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
        default:
            return state
    }
  }
  
  export default viewUpdate