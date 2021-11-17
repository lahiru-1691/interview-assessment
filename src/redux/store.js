import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux/sagas/index";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,  {}, composeEnhancers(
  applyMiddleware(...middlewares)
));
  
sagaMiddleware.run(rootSaga);

export default store;