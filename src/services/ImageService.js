import axios from "axios";
import apiClients from "../apiClients/apiClients";

class ImageService {

    static async saveImage(formData) {
        return apiClients.post(`/images`,formData)
        // return axios.post('http://localhost:8080/api/images', formData, {
        //     headers: {
        //         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        //     },
        // });
    }
    static async deleteImage(id) {
        return apiClients.delete(`/images/${id}`)
        // return axios.delete(`http://localhost:8080/api/images/${id}`, {
        //     headers: {
        //         'Content-Type': `multipart/form-data`,
        //     },
        // })
    }
}
export default ImageService;
