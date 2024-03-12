import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RoomService from "../../services/RoomService";
const inItState = {
  room: {
    searchBar: {
        guests: {
            numberAdult: 2,
            numberChildren: 0,
        },
        checkIn: new Date(),
        checkOut: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        viewType: "ALL",
        sortBy: "",
        perType: "-1",   
        // rateType: "ALL",
        roomType: "ALL",
        priceMin: 1000000,
        priceMax: 30000000,
    },
    data: [],
  },
  addOns: {

  },
  guest: {

  },
  booking:{
    bookingDetails: [
        {
            checkIn: "2024-03-08",
            checkOut: "2024-03-08",
            numberAdult: 0,
            numberChildren: 0,
            roomId: 1,
            roomName: "Seaview Balcony King Grand",
            priceRoom: 2000000,
            vatBookingDetail: 10,
        }
    ]
  }
};
export const searchRoomsAPI = createAsyncThunk(
  "searchRoomsAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await RoomService.getAllRooms("http://localhost:8080/api/rooms");

      return res;
    } catch (err) {
      return rejectWithValue("Error getting all rooms");
    }
  }
);
export const changeGuestInSearchBarAPI = createAsyncThunk(
    "changeGuestInSearchBarAPI",
    async (arg, { rejectWithValue }) => {
      try {
        // tùy vào arg để gửi thông tin lên cho phù hợp
        let res = await RoomService.getAllRooms("http://localhost:8080/api/rooms");
  
        return res;
      } catch (err) {
        return rejectWithValue("Error getting all rooms");
      }
    }
  );

const bookingReducer = createSlice({
  name: "booking",
  initialState: inItState,
  reducers: {
    // getAll: (state, action) => {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(searchRoomsAPI.pending, (state, action) => {});
    builder.addCase(searchRoomsAPI.fulfilled, (state, action) => {
      state.room.data = action.payload;
    });
    builder.addCase(changeGuestInSearchBarAPI.pending, (state, action) => {});
    builder.addCase(changeGuestInSearchBarAPI.fulfilled, (state, action) => {
      state.room.data = action.payload;
    });
  },
});

export default bookingReducer;
