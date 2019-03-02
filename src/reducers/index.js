import { combineReducers } from 'redux'
import navigator from './navigator'
import viewUpdate from './view'

const cloudreveApp = combineReducers({
    navigator,viewUpdate
})
  
export default cloudreveApp