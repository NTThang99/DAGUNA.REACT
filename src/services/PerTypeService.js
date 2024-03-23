import apiClients from "../apiClients/apiClients";

class PerTypeService {
    static async getAllPerType(url) {
        return apiClients.get(`/pertype`)
      }
}
export default PerTypeService;
