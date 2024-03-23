import { combineReducers } from "redux";


import roomReducer from "../components/home/RoomSlide";
import customerReducer from "../components/home/Slide/CustomerSlide";
import bookingReducer from "../components/home/BookingSlide";
import receptionistReducer from "../components/home/Slide/ReceptionistSlide";


const rootReducer = combineReducers({
  room: roomReducer.reducer,
  customer: customerReducer.reducer,
  receptionist: receptionistReducer.reducer,
  booking: bookingReducer.reducer
});

export default rootReducer;
