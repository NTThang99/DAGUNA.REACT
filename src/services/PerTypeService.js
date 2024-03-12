
class PerTypeService {
    static async getAllPerType(url) {
        return fetch(url)
          .then((res) => res.json());
      }
}
export default PerTypeService;
