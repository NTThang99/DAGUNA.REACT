import apiClients from "../apiClients/apiClients";

class RoomService{
    static getRoomList(){
        return apiClients.get(`/rooms`)
    }
}
export default RoomService