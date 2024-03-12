
class  UtilityService {
    static async getAllUtility(url) {
        return fetch(url)
          .then((res) => res.json());
      }
}
export default UtilityService;
