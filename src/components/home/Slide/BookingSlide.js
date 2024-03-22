import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import BookingService from "../Booking/BookingService";
const inItState = {
    data: [],
  };

 
import { getAllBookingsAPI } from "../../home/BookingSlide";
import BookingService from "../../home/Booking/BookingService";

export const getAllBookingsAPI = createAsyncThunk(
    "getAllBookingsAPI",
    async (arg, { rejectWithValue }) => {
      try {
        let res = await BookingService.getAllBookingsAPI(arg);
        console.log("res", res);
        return res;
  
      } catch (err) {
        return rejectWithValue("Error getting all bookings");
      }
    }
  );

  const bookingReducer = createSlice({
    name: "booking",
    initialState: inItState,
    reducers: {
      getAll: (state, action) => {
        state.data = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getAllBookingsAPI.pending, (state, action) => { });
      builder.addCase(getAllBookingsAPI.fulfilled, (state, action) => {
        state.data = action.payload;
      });
    },
  });
  export default bookingReducer;