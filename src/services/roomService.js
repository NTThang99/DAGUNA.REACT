export default class RoomService {
  async getAllRoom(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
  }
}
