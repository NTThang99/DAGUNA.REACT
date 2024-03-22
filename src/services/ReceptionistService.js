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
  static async editReceptionist(receptionistId, formData) {
    return apiClients.put(`/receptionists/${receptionistId}`, formData)
  }
  static async getReceptionistById(receptionistId) {
    return apiClients.get(`/receptionists/${receptionistId}`)
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


