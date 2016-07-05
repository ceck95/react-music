import {combineReducers} from 'redux'
import musicReducer from './musicReducer'
import onemusicReducer from './onemusicReducer'
import { routerReducer } from 'react-router-redux'
const rootReducer = combineReducers ({
  listmusic:musicReducer,
  onemusic:onemusicReducer,
  routing: routerReducer
})
export default rootReducer
