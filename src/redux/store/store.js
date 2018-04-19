import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers/reducer'



let buildStore = compose(applyMiddleware(thunk))(createStore)

export default function configureStore() {
    let store
    return store = buildStore(reducer) 
}
