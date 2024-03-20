import apiClients from "../apiClients/apiClients";

class StatusRoomService {
    static async getAllStatusRoom() {
        return apiClients.get(`/estatus`)
    }
}
export default StatusRoomService;
