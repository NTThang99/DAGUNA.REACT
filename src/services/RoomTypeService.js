
class RoomTypeService {
    static async getAllRoomType(url) {
        return fetch(url)
          .then((res) => res.json());
      }
}
export default RoomTypeService;
