const explorer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_FILE_LIST':
            return Object.assign({}, state, {
                fileList: action.list
            });
        case 'ADD_SELECTED_TARGET':
            return Object.assign({}, state, {
                selected: [...state.selected,action.targets]
            });
        case 'SET_SELECTED_TARGET':
            return Object.assign({}, state, {
                selected: action.targets
            });
        default:
            return state
    }
  }
  
  export default explorer