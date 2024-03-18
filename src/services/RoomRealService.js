import apiClients from "../apiClients/apiClients";

class RoomRealService {

    static getAllRoomReal() {
        return apiClients.get(`/room-reals`)
    }
    static getRoomRealById(roomId) {
        return apiClients.get(`/room-reals/${roomId}`)
    }
    
}

export default RoomRealService