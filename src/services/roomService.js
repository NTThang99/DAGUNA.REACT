import axios from "axios";
import apiClients from "../apiClients/apiClients";

class RoomService {

  // get all room mmm

  
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
  static async searchRooms(url, objSend) {
    return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(objSend),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
  }
}
export default RoomService;


