import axios from "axios";
import apiClients from "../apiClients/apiClients";

class RoomService {


  static async getAllRooms() {
    return apiClients.get(`/rooms`)
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
  static async patchUpdateRoomReal(roomId, formData) {
    return apiClients.patch(`/rooms/${roomId}/room-reals`, formData)
  }
  static async patchUpdateRoom(roomId, formData) {
    return apiClients.patch(`/rooms/${roomId}`, formData)
  }

  static async updateSearchBarHeader(url, objSend) {
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

  static async updateSearchSortBarHeader(url, objSend) {
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

}
export default RoomService;


