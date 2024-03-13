import axios from "axios";

class ImageService {

    static async saveImage(formData) {

        console.log("formData", formData);
        return axios.post('http://localhost:8080/api/images', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
        });
    }
    static async deleteImage(id) {
        return axios.delete(`http://localhost:8080/api/images/${id}`, {
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        })
    }
}
export default ImageService;
