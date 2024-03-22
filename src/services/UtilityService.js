import apiClients from "../apiClients/apiClients";

class  UtilityService {
    static async getAllUtility(url) {
        return apiClients.get(`/utility`)
      }
}
export default UtilityService;
