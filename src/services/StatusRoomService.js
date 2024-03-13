
class StatusRoomService {
    static async getAllStatusRoom(url) {
        return fetch(url)
          .then((res) => res.json());
      }
}
export default StatusRoomService;
