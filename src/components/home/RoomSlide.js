import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


import RoomService from "../../services/RoomService";

const inItState = {
  filter: {
    price: 5000000,
    roomType: 30,
    kw: "",
  },
  data: [],
};
export const getAllRoomsAPI = createAsyncThunk(
  "getAllRoomsAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await RoomService.getAllRooms(arg);

      return res;
    } catch (err) {
      return rejectWithValue("Error getting all rooms");
    }
  }
);

const roomReducer = createSlice({
  name: "room",
  initialState: inItState,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRoomsAPI.pending, (state, action) => {});
    builder.addCase(getAllRoomsAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default roomReducer;
