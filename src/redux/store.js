import {createStore} from 'redux'
import chatReducer from './action/chatReducer'

const store = createStore(chatReducer)
export default store;
