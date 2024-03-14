import axios from "axios";
import apiClients from "../apiClients/apiClients";

class RoomService {

  // get all room

  
  static async getAllRooms(url) {
    return fetch(url)
      .then((res) => res.json())
  }
  static async createRoom(formData) {
    console.log("formData", formData);
    // return axios.post(url, formData, {
    //   headers: {
    //     'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    //   },
    // });
    return apiClients.post('/rooms',formData)
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


