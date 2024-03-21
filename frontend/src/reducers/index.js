import { combineReducers } from "redux";

import {home, servers} from "./reducers";

export const Reducers = combineReducers({ home, servers });