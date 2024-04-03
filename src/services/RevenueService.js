import apiClients from "../apiClients/apiClients";

export default class RevenueService {
    static async postRevenue(formData){
        return apiClients.post(`/bookings/find-revenue`,formData)
    }
    static async getShowRevenue(){
      return apiClients.get(`/bookings/show-revenue-by-month`)
    }
}