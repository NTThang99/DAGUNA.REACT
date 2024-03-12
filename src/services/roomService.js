import axios from "axios";
import apiClients from "../apiClients/apiClients";

class RoomService {

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
}
export default RoomService;
