import axios from "axios";
const API_URL = "http://localhost:8000/api/v1/auth";

class AuthService {
    
    loginhospital(role:any , userID:any , password:any){
        return axios.post(API_URL + "/loginhospital" , {role ,userID , password});
    };

    loginbreeder(role:any , userID:any , password:any){
        return axios.post(API_URL + "/loginbreeder" , {role ,userID , password});
    };

    logout(){
        localStorage.removeItem("user");
    }

    register(userID:any, email:any , password:any){
        return axios.post(API_URL + "/register" , {
            userID , email , password 
        })
    };
    
    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user") || "null"); 
    };   
}

export default new AuthService();