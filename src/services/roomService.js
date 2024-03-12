import apiClients from "../apiClients/apiClients";
//up ..
class RoomService {
  static getRoomList() {
    return apiClients.get(`/rooms`);
  }
  // get all room
  static async getAllRooms(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
  }
}
export default RoomService;
