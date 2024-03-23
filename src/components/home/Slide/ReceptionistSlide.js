import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import ReceptionistService from "../../../services/RoomService";
import ELockService from "../../../services/ELockService";

const inItState = {
  data: [],
};
const inItStateELock = {
  data: []
}



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

export const getAllELockAPI = createAsyncThunk(
  "getAllELockAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await ELockService.getAllELock(arg)
      return res
    } catch (error) {
      return rejectWithValue("Error getting all e role");
    }
  }
)
export const eLockReducer = createSlice({
  name: "eLock",
  initialState: inItStateELock,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllELockAPI.pending, (state, action) => { });
    builder.addCase(getAllELockAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});