import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RoomService from "../../services/RoomService";
import BookingService from "../../services/BookingService";
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
    bookingServices: [],
    data: [],
  },
  guest: {},
  booking: {
    bookingId: null,
    bookingDetailChoosen: null,
    bookingDetails: [],
  },
  loading: false,
};
export const searchRoomsAPI = createAsyncThunk(
  "searchRoomsAPI",
  async (arg, { rejectWithValue }) => {
    // console.log("arg", arg);

    let objSend = {
      guest: {
        numberAdult: arg.searchBar.guests.numberAdult,
        numberChildren: arg.searchBar.guests.numberChildren,
      },
      checkIn: arg.searchBar.checkIn,
      checkOut: arg.searchBar.checkOut,
      perType: arg.searchBar.perType,
      priceMin: arg.searchBar.priceMin,
      priceMax: arg.searchBar.priceMax,
    };
    try {
      let res = await RoomService.searchRooms(
        `http://localhost:8080/api/rooms/search?page=${0}`,
        objSend
      );

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
      let res = await RoomService.getAllRooms(
        "http://localhost:8080/api/rooms"
      );

      return res;
    } catch (err) {
      return rejectWithValue("Error getting all rooms");
    }
  }
);

export const getAllBookingServiceAPI = createAsyncThunk(
  "getAllBookingServiceAPI",
  async (arg, { rejectWithValue }) => {
    try {
      // tùy vào arg để gửi thông tin lên cho phù hợp
      let res = await BookingService.getAllBookingService(
        "http://localhost:8080/api/booking-services"
      );

      return res;
    } catch (err) {
      return rejectWithValue("Error getting all booking service");
    }
  }
);
export const createBookingAPI = createAsyncThunk(
  "createBookingAPI",
  async (arg, { rejectWithValue }) => {
    try {
      // tùy vào arg để gửi thông tin lên cho phù hợp
      let objSend = {
        bookingDetail: {
          checkIn: arg.searchBar.checkIn,
          checkOut: arg.searchBar.checkOut,
          roomId: arg.roomId,
          numberAdult: arg.searchBar.guests.numberAdult,
          numberChildren: arg.searchBar.guests.numberChildren,
        },
      };
      let res = await BookingService.createBooking(
        "http://localhost:8080/api/bookings",
        objSend
      );

      // console.log("objSend", objSend);
      return res;
    } catch (err) {
      return rejectWithValue("Error getting all rooms");
    }
  }
);

export const updateBooking_EditRoom = createAsyncThunk(
  "updateBooking_EditRoom",
  async (arg, { rejectWithValue }) => {
    try {
      // tùy vào arg để gửi thông tin lên cho phù hợp
      let objSend = {
        bookingId: arg.bookingId,
        bookingDetail: {
          checkIn: arg.searchBar.checkIn,
          checkOut: arg.searchBar.checkOut,
          roomId: arg.roomId,
          numberAdult: arg.searchBar.guests.numberAdult,
          numberChildren: arg.searchBar.guests.numberChildren,
        },
        // dateChooseService: arg?.dateChooseService
      };
      // console.log("objSend", objSend);
      let res = await BookingService.updateBooking_EditRooms(
        "http://localhost:8080/api/bookings/rooms/edit",
        objSend
      );

      return res;
    } catch (err) {
      return rejectWithValue("Error getting all Booking_Add_Service");
    }
  }
);

export const updateBooking_AddBookingService = createAsyncThunk(
  "updateBooking_AddBookingService",
  async (arg, { rejectWithValue }) => {
    try {
      // tùy vào arg để gửi thông tin lên cho phù hợp
      let objSend = {
        bookingDetailId: arg.bookingDetailId,
        bookingServiceId: arg.bookingServiceId,
        bookingServiceType: arg.bookingServiceType,
        numberCarOrPerson: 1,
        // dateChooseService: arg?.dateChooseService
      };
      // console.log("objSend", JSON.stringify(objSend));
      let res = await BookingService.updateBooking_AddService(
        "http://localhost:8080/api/bookings/booking-services/add",
        objSend
      );

      return res;
    } catch (err) {
      return rejectWithValue("Error getting all Booking_Add_Service");
    }
  }
);

export const updateBooking_AddBookingCustomer = createAsyncThunk(
  "updateBooking_AddBookingService",
  async (arg, { rejectWithValue }) => {
    try {
      // tùy vào arg để gửi thông tin lên cho phù hợp
      let objSend = {
        ...arg.customerInfo,
        bookingId: arg.bookingId,
      };
      console.log("objSend", objSend);
      let res = await BookingService.updateBooking_AddCustomerInfo(
        `http://localhost:8080/api/bookings/${objSend.bookingId}/customer`,
        objSend
      );

      return res;
    } catch (err) {
      return rejectWithValue("Error getting all Booking_Add_Service");
    }
  }
);

export const getBookingByIdAPI = createAsyncThunk(
  "getBookingByIdAPI",
  async (id, { rejectWithValue }) => {
    try {
      // tùy vào arg để gửi thông tin lên cho phù hợp
      let res = await BookingService.getBookingById(
        `http://localhost:8080/api/bookings/${id}`
      );

      return res;
    } catch (err) {
      return rejectWithValue("Error getting when get booking by Id");
    }
  }
);

export const updateBooking_AddRoomAPI = createAsyncThunk(
  "updateBooking_AddRoomAPI",
  async (arg, { rejectWithValue }) => {
    try {
      // tùy vào arg để gửi thông tin lên cho phù hợp

      let objSend = {
        bookingId: arg.bookingId,
        bookingDetail: {
          checkIn: arg.searchBar.checkIn,
          checkOut: arg.searchBar.checkOut,
          roomId: arg.roomId,
          numberAdult: arg.searchBar.guests.numberAdult,
          numberChildren: arg.searchBar.guests.numberChildren,
        },
      };
      // console.log("objSend", objSend);
      let res = await BookingService.updateBooking_AddRoom(
        "http://localhost:8080/api/bookings/rooms/add",
        objSend
      );

      return res;
    } catch (err) {
      return rejectWithValue("Error update booking: add room");
    }
  }
);

export const updateBooking_DeleteRoomAPI = createAsyncThunk(
  "updateBooking_DeleteRoomAPI",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await BookingService.updateBooking_DeleteRoomAPI(
        `http://localhost:8080/api/bookings/${arg.bookingId}/rooms/${arg.bookingDetailId}/delete`
      );
      return res;
    } catch (err) {
      // Trả về lỗi nếu không thể xóa
      return rejectWithValue("Error deleting booking detail");
    }
  }
);

const bookingReducer = createSlice({
  name: "booking",
  initialState: inItState,
  reducers: {
    updateSearchBar: (state, action) => {
      state.room.searchBar = { ...state.room.searchBar, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchRoomsAPI.pending, (state, action) => {});
    builder.addCase(searchRoomsAPI.fulfilled, (state, action) => {
      state.room.data = action.payload.content;
    });
    builder.addCase(changeGuestInSearchBarAPI.pending, (state, action) => {});
    builder.addCase(changeGuestInSearchBarAPI.fulfilled, (state, action) => {
      state.room.data = action.payload;
    });

    builder.addCase(createBookingAPI.pending, (state, action) => {});
    builder.addCase(createBookingAPI.fulfilled, (state, action) => {
      localStorage.setItem("bookingId", action.payload.bookingId);
      state.booking.bookingDetails = action.payload.bookingDetails;
      state.booking.bookingId = action.payload.bookingId;
    });
    builder.addCase(getBookingByIdAPI.pending, (state, action) => {});
    builder.addCase(getBookingByIdAPI.fulfilled, (state, action) => {
      if (action.payload != null) {
        state.booking.bookingDetails = action.payload.bookingDetails;
        state.booking.bookingId = action.payload.bookingId;
        if (action.payload.bookingDetails.length != 0) {
          state.booking.bookingDetailChoosen =
            action.payload.bookingDetails[
              action.payload.bookingDetails.length - 1
            ].bookingDetailId;
        }
      }
    });
    builder.addCase(updateBooking_AddRoomAPI.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBooking_AddRoomAPI.fulfilled, (state, action) => {
      state.loading = true;

      state.booking.bookingDetails = action.payload.bookingDetails;
      state.booking.bookingId = action.payload.bookingId;
      state.booking.bookingDetailChoosen =
        action.payload.bookingDetails[
          action.payload.bookingDetails.length - 1
        ].bookingDetailId;
    });
    builder.addCase(
      updateBooking_AddBookingService.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      updateBooking_AddBookingService.fulfilled,
      (state, action) => {
        state.booking.bookingDetails = action.payload.bookingDetails;
        state.booking.bookingId = action.payload.bookingId;
        state.loading = true;
      }
    );
    builder.addCase(getAllBookingServiceAPI.pending, (state, action) => {});
    builder.addCase(getAllBookingServiceAPI.fulfilled, (state, action) => {
      state.addOns.data = action.payload;
    });
    builder.addCase(updateBooking_EditRoom.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBooking_EditRoom.fulfilled, (state, action) => {
      state.loading = true;
      state.booking.bookingDetails = action.payload.bookingDetails;
    });
    builder.addCase(updateBooking_DeleteRoomAPI.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBooking_DeleteRoomAPI.fulfilled, (state, action) => {
      state.loading = true;
      state.booking.bookingDetails = action.payload.bookingDetails;
      state.booking.bookingId = action.payload.bookingId;
      if (action.payload.bookingDetails.length == 0) {
        state.booking.bookingDetailChoosen = null;
      } else {
        state.booking.bookingDetailChoosen =
          action.payload.bookingDetails[
            action.payload.bookingDetails.length - 1
          ].bookingDetailId;
      }
    });
  },
});

export const { updateSearchBar, updateBookingDetails } = bookingReducer.actions;

export default bookingReducer;
