import axios from "axios";
import apiClients from "../apiClients/apiClients";

class RoomService {


  static async getAllRooms(url) {
    return fetch(url)
      .then((res) => res.json())
  }
  static async createRoom(formData) {
    return apiClients.post('/rooms', formData)
  }
  static async getRoomById(roomId) {
    // console.log("`http:/localhost/api/rooms/${roomId}`", `http:/localhost:8080/api/rooms/${roomId}`);
    return fetch(`http://localhost:8080/api/rooms/${roomId}`)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
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
  static async patchUpdateRoomReal(roomId, formData) {
    return apiClients.patch(`/rooms/${roomId}/room-reals`, formData)
  }
  static async postUpdateRoom(roomId, formData) {
    return apiClients.post(`/rooms/${roomId}`, formData)
  }
}
export default RoomService;


