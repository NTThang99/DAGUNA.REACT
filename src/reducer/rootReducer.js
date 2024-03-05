import { combineReducers } from "redux";

import roomReducer from "../components/home/RoomSlide";
import customerReducer from "../components/home/CustomerSlide";

const rootReducer = combineReducers({
  room: roomReducer,
  customer: customerReducer,
});

export default rootReducer;
