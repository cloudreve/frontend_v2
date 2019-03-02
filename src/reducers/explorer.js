const explorer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_FILE_LIST':
            return Object.assign({}, state, {
                fileList: action.list
            });
        default:
            return state
    }
  }
  
  export default explorer