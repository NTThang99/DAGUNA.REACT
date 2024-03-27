import apiClients from "../apiClients/apiClients";
import axios from "axios";


class RoomRealService {

    static getAllRoomReal() {
        return apiClients.get(`/room-reals`)
    }
    static getRoomRealById(roomId) {
        return apiClients.get(`/room-reals/${roomId}`)
    }


    static async getAvailableRoom( objSend) {
      return apiClients.post(`/room-reals/available`, objSend);
      }

    static async getUpdateBooking_UpdateBookingDetail_UpdateRoomReal(bookingDetailId, roomRealId){
        var bodyFormData = new FormData();
        bodyFormData.append('roomRealId', roomRealId);

        return axios({
            method: "PATCH",
            url: `http://localhost:8080/api/bookings/update/booking-detail/${bookingDetailId}`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          });
    }
}

export default RoomRealService