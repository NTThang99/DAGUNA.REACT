import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import RoomService from "../../../services/RoomService";
import PerTypeService from "../../../services/RoomService";
import RoomTypeService from "../../../services/RoomService";
import StatusRoomService from "../../../services/RoomService";
import UtilityService from "../../../services/RoomService";
import ViewTypeService from "../../../services/RoomService";
import KindOfRoomService from "../../../services/RoomService";

const inItState = {
  filter: {
    price: 5000000,
    roomType: "",
    perType: "",
    statusRoom: "",
    kingOfRoom: "",
    utilitie: "",
    viewType: "",
    kw: "",
  },
  data: [],
};
const inItStatePerType = {
  data: []
}
const inItStateRoomType = {
  data: []
}
const inItStateStatusRoom = {
  data: []
}
const inItStateUtility = {
  data: []
}
const inItStateKindOfRoom = {
  data: []
}
const inItStateViewType = {
  data: []
}

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
    builder.addCase(getAllRoomsAPI.pending, (state, action) => { });
    builder.addCase(getAllRoomsAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default roomReducer;

export const getAllPerTypeAPI = createAsyncThunk(
  "getAllPerTypeAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await PerTypeService.getAllPerType(arg)
      return res
    } catch (error) {
      return rejectWithValue("Error getting all per type");
    }
  }
)
export const perTypeReducer = createSlice({
  name: "perType",
  initialState: inItStatePerType,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPerTypeAPI.pending, (state, action) => { });
    builder.addCase(getAllPerTypeAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});


export const getAllRoomTypeAPI = createAsyncThunk(
  "getAllRoomTypeAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await RoomTypeService.getAllRoomType(arg)
      return res
    } catch (error) {
      return rejectWithValue("Error getting all view type");
    }
  }
)
export const roomTypeReducer = createSlice({
  name: "roomType",
  initialState: inItStateRoomType,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRoomTypeAPI.pending, (state, action) => { });
    builder.addCase(getAllRoomTypeAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const getAllStatusRoomAPI = createAsyncThunk(
  "getAllStatusRoomAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await StatusRoomService.getAllStatusRoom(arg)
      return res
    } catch (error) {
      return rejectWithValue("Error getting all status room");
    }
  }
)
export const statusRoomReducer = createSlice({
  name: "statusRoom",
  initialState: inItStateStatusRoom,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStatusRoomAPI.pending, (state, action) => { });
    builder.addCase(getAllStatusRoomAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const getAllUtilityAPI = createAsyncThunk(
  "getAllUtilityAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await UtilityService.getAllUtility(arg)
      return res
    } catch (error) {
      return rejectWithValue("Error getting all utility ");
    }
  }
)
export const utilityReducer = createSlice({
  name: "utility",
  initialState: inItStateUtility,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUtilityAPI.pending, (state, action) => { });
    builder.addCase(getAllUtilityAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const getAllViewTypeAPI = createAsyncThunk(
  "getAllViewTypeAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await ViewTypeService.getAllViewType(arg)
      return res
    } catch (error) {
      return rejectWithValue("Error getting all view type");
    }
  }
)
export const viewTypeReducer = createSlice({
  name: "viewType",
  initialState: inItStateViewType,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllViewTypeAPI.pending, (state, action) => { });
    builder.addCase(getAllViewTypeAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const getAllKindOfRoomAPI = createAsyncThunk(
  "getAllKindOfRoomAPI",
  async (arg, { rejectWithValue }) => {
    try {
      let res = await KindOfRoomService.getAllKindOfRoom(arg)
      return res
    } catch (error) {
      return rejectWithValue("Error getting all kind of room");
    }
  }
)
export const kindOfRoomReducer = createSlice({
  name: "kindOfRoom",
  initialState: inItStateKindOfRoom,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllKindOfRoomAPI.pending, (state, action) => { });
    builder.addCase(getAllKindOfRoomAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});