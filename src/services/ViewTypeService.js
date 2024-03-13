
class ViewTypeService {
    static async getAllViewType(url) {
        return fetch(url)
          .then((res) => res.json());
      }
}
export default ViewTypeService;
