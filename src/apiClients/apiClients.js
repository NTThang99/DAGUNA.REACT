import axios from "axios"

const POST = 8080;
const apiClients = axios.create({
    // baseURL: `http://localhost:${POST}/api`
    baseURL: `${import.meta.env.VITE_API_URL}`
    // ,
    // headers: {"Access-Control-Allow-Origin": "*"},
    // responseType: "json",
})
export default apiClients