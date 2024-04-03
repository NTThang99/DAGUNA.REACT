import apiClients from "../apiClients/apiClients";
//up ..
class BookingService {
  static async createBooking(url, objSend) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }

  static async updateBooking_EditService(url, objSend) {
    console.log("aakakak");
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }
  static async updateBooking_AddService(url, objSend) {
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }

  static async updateBooking_EditRooms(url, objSend) {
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }

  static async updateBooking_AddCustomerInfo(url, objSend) {
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }

  static async getAllBookingService(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
  }

  static async updateBooking_AddRoom(url, objSend) {
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }
  static async updateBooking_DeleteRoomAPI(url) {
    return fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }
  static async updateBooking_Complete(url) {
    return fetch(url, {
      method: "PATCH",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }
  static async getBookingById(url) {
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else if (res.status == 200) {
          return res.json();
        } else if (res.status == 204) {
          return null;
        }
      })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  }

  static async getBookingsById(bookingId) {
    console.log("bookingId", bookingId);
    return apiClients.get(`/bookings/${bookingId}`);
  }
}
export default BookingService;
