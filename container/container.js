import React from 'react'
import { render } from 'react-dom'
import Index from '../components/Index'
import AppMusic from '../components/AppMusic'
import AppIndex from '../components/AppIndex'
import configureStore from '../store/store'
import { Provider } from 'react-redux'
import { Router, Route ,IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'font-awesome/css/font-awesome.css'
let initialState = {}
let store = configureStore(initialState)
const history = syncHistoryWithStore(hashHistory, store)
render(
  <Provider store={store}>
   <Router history={history}>
     <Route path="/" component={Index}>
       <IndexRoute component={AppIndex}/>
       <Route path="music" component={AppMusic}/>
     </Route>
   </Router>
 </Provider>,
  document.getElementById('app')
)
