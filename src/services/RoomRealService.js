import apiClients from "../apiClients/apiClients";

class RoomRealService {

    static getAllRoomReal() {
        return apiClients.get(`/room-reals`)
    }
    static getRoomRealById(roomId) {
        return apiClients.get(`/room-reals/${roomId}`)
    }
    static postFindAvailableRoomReal(objDate){
        console.log("objDate aaaaaa",objDate);
        return apiClients.post(`/room-reals/findAvailableRoomReal`,objDate)
    }
    
}

export default RoomRealService