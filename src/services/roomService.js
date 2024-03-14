import axios from "axios";
import apiClients from "../apiClients/apiClients";

class RoomService {

  // get all room
  static async getAllRooms(url) {
    return fetch(url)
      .then((res) => res.json())
  }
  static async createRoom(formData) {
    return apiClients.post('/rooms', formData)
  }
  static async getRoomById(roomId) {
    return apiClients.get(`/rooms/${roomId}`)
  }
  static async getAllRoomByFilter(url) {
    return apiClients.get(`${url}`)
  }
}
export default RoomService;


