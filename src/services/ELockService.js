import apiClients from "../apiClients/apiClients";

class ELockService {
    static async getAllELock() {
        return apiClients.get(`/elocks`)
      }
}
export default ELockService;

