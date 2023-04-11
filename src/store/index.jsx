import thunk from 'redux-thunk'
import { top_level } from '../reducers'
import { createStore, compose, applyMiddleware } from 'redux'
import { points_cleaner } from '../middlewares'

const setupStore = (initState) => {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middlewareEnhancer = applyMiddleware(points_cleaner, thunk)
    
    const store = createStore(top_level, initState, composeEnhancer(middlewareEnhancer))

    return store
}

export {setupStore}