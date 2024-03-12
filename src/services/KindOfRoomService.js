
class KindOfRoomService {
    static async getAllKindOfRoom(url) {
        return fetch(url)
          .then((res) => res.json());
      }
}
export default KindOfRoomService;
