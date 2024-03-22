import apiClients from "../apiClients/apiClients";

class RoomTypeService {
    static async getAllRoomType(url) {
        return apiClients.get(`/erooms`)
      }
}
export default RoomTypeService;
