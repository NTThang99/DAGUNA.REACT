import axios from "axios";
import apiClients from "../apiClients/apiClients";

class ReceptionistService {

  // get all receptionist
  static async getAllReceptionists(url) {
    return fetch(url)
      .then((res) => res.json())
  }
  static async createReceptionist(formData) {
    console.log("formData", formData);
    // return axios.post(url, formData, {
    //   headers: {
    //     'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    //   },
    // });
    return apiClients.post('/receptionists',formData)
  }
}
export default ReceptionistService;


