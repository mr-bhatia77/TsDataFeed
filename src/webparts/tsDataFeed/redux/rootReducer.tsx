import { combineReducers } from "redux";
import applicationReducer from "./application/applicationReducer";

const rootReducer = combineReducers({
    application:applicationReducer
})

export default rootReducer;