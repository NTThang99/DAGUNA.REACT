import { combineReducers } from "redux";

import roomReducer from "../components/home/Slide/RoomSlide";
import customerReducer from "../components/home/Slide/RoomSlide";

const rootReducer = combineReducers({
  room: roomReducer.reducer,
  customer: customerReducer.reducer
});

export default rootReducer;
