import axios from "axios";

const http = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    responseType: 'json',
    timeout: 10000,
    timeoutErrorMessage: 'Takes too long for response'
})

const getHeaders = (secured) =>{
    let options = {
        'Content-Type': 'application/json'
    }
    if(secured){
        options['Authorization'] = localStorage.getItem('token');
    }
    return options;
}

const GET = (url, isSecured = false, params={})=>{
    return http.get(url,{
        headers: getHeaders(isSecured),
        params
    });

}

const POST = (url,data, isSecured = false, params={})=>{
    return http.post(url, data, {
        headers: getHeaders(isSecured),
        params
    });
}

const PUT = (url,data,isSecured = false,params={})=>{
    return http.put(url, data, {
        headers: getHeaders(isSecured),
        params
    });
}

const DELETE = (url,isSecured = false,params={})=>{
    return http.delete(url,{
        headers: getHeaders(isSecured),
        params
    });
}
export const httpClient = {
    GET,
    POST,
    PUT,
    DELETE
}