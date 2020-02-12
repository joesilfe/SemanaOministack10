import { createStore, applyMiddleware, compose } from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const INICITAL_STATE = {
    dev: []
}

function componenteReducer(state = INICITAL_STATE, action) {
    
    // responsável por abrir e fechar aside
    if (action.type === 'ADD_DEV') {                
        if (action.dev) {
            state.dev = action.dev
            return {...state}
        }
    } else return state
    
}

const store = createStore(componenteReducer, composeEnhancers(applyMiddleware()))

export default store;