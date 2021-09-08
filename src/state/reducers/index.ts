import {combineReducers} from 'redux'
import uploadImageReducer from './uploadImageReducer'

const reducers = combineReducers({
    uploadImage:uploadImageReducer
})

export default reducers