import { combineReducers } from 'redux'
import navigator from './navigator'
import viewUpdate from './view'
import explorer from './explorer'

const cloudreveApp = combineReducers({
    navigator,viewUpdate,explorer
})
  
export default cloudreveApp