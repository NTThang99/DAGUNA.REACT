import apiClients from "../apiClients/apiClients";

class KindOfRoomService {
    static async getAllKindOfRoom() {
        return apiClients.get(`/kindofroom`)
      }
}
export default KindOfRoomService;
