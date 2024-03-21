import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import ReceptionistService from "../../../services/RoomService";

const inItState = {
  data: [],
};



export const getAllReceptionistsAPI = createAsyncThunk(
  "getAllReceptionistsAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await ReceptionistService.getAllReceptionists(arg);
      console.log("res", res);
      return res;

    } catch (err) {
      return rejectWithValue("Error getting all receptionists");
    }
  }
);

const receptionistReducer = createSlice({
  name: "receptionist",
  initialState: inItState,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReceptionistsAPI.pending, (state, action) => { });
    builder.addCase(getAllReceptionistsAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default receptionistReducer;