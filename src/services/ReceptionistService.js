import axios from "axios";
import apiClients from "../apiClients/apiClients";

class ReceptionistService {

  
  static async getAllReceptionists(url) {
    return fetch(url)
      .then((res) => res.json())
  }
  static async createReceptionist(formData) {
    return apiClients.post('/receptionists', formData)
  }
  static async getReceptionistById(roomId) {
    return apiClients.get(`/receptionists/${roomId}`)
  }
  static async getAllReceptionistByFilter(url) {
    return apiClients.get(`${url}`)
  }
  static async searchReceptionists(url, objSend) {
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
export default ReceptionistService;


