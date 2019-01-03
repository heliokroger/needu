import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from './reducers/userReducer'

export default createStore(combineReducers({
    form: formReducer,
    user: userReducer
}))