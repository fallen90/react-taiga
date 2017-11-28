import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";

const logger = createLogger({});

export default createStore(
	rootReducer,
	compose(
		applyMiddleware(promise(), thunk, logger),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);
