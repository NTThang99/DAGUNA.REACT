import apiClients from "../apiClients/apiClients";

class ViewTypeService {
    static async getAllViewType() {
        return apiClients.get(`/eview-types`)
      }
}
export default ViewTypeService;
