import apiClients from "../apiClients/apiClients";

class StatusRoomService {
    static async getAllStatusRoom(url) {
        return apiClients.get(`/estatus`)
    }
}
export default StatusRoomService;
