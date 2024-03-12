import { combineReducers } from "redux";


import roomReducer from "../components/home/RoomSlide";
import customerReducer from "../components/home/Slide/CustomerSlide";
import bookingReducer from "../components/home/BookingSlide";


const rootReducer = combineReducers({
  room: roomReducer.reducer,
  customer: customerReducer.reducer,
  booking: bookingReducer.reducer
});

export default rootReducer;
