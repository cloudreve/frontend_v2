const viewUpdate = (state = [], action) => {
    switch (action.type) {
        case 'DRAWER_TOGGLE':
            return Object.assign({}, state, {
                open: action.open
            });
        default:
            return state
    }
  }
  
  export default viewUpdate