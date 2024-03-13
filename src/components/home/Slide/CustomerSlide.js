import { createSlice } from "@reduxjs/toolkit";

const inItState = {
  email: "",
  role: "USER",
  kw: "",
};

const customerReducer = createSlice({
  name: "customer",
  initialState: inItState,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(getAllRoomsAPI.pending, (state, action) => {});
  //     builder.addCase(getAllRoomsAPI.fulfilled, (state, action) => {
  //       state.data = action.payload;
  //     });
  //   },
});

export default customerReducer;
