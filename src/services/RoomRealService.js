import apiClients from "../apiClients/apiClients";
import axios from "axios";


class RoomRealService {

    static getAllRoomReal() {
        return apiClients.get(`/room-reals`)
    }
    static getRoomRealById(roomId) {
        return apiClients.get(`/room-reals/${roomId}`)
    }
    static postFindAvailableRoomReal(objDate){
        return apiClients.post(`/room-reals/find-available-roomReal`,objDate)
    }
    static postFindAvailableRoomRealHaveRoomRealId(objDate,roomId){
        return apiClients.post(`/room-reals/find-available-room-real?roomId=${roomId}`,objDate)
    }
    

    static async getAvailableRoom( objSend) {
      return apiClients.post(`/room-reals/available`, objSend);
      }
    static async getAvailableRoomHavieRoomId(roomId, objSend) {
      return apiClients.post(`/room-reals/available?roomId=${roomId}`, objSend);
      }

    static async getUpdateBooking_UpdateBookingDetail_UpdateRoomReal(bookingDetailId, roomRealId){
        var bodyFormData = new FormData();
        bodyFormData.append('roomRealId', roomRealId);
        console.log("bookingDetailId",bookingDetailId);
        console.log("roomRealId",roomRealId);
        return axios({
            method: "PATCH",
            url: `http://localhost:8080/api/bookings/update/booking-detail/${bookingDetailId}`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          });
    }
    static async postFindAvailableRoom(objSend){
        return apiClients.post(`rooms/find-available-room`,objSend);
    }
}

export default RoomRealService