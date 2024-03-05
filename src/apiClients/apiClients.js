import axios from "axios"

const POST = 9001;
const apiClients = axios.create({
    baseURL: `http://localhost:${POST}/api`
    // ,
    // headers: {"Access-Control-Allow-Origin": "*"},
    // responseType: "json",
})
export default apiClients