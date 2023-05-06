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

    register(userID:any, username:any , email:any , password:any){
        return axios.post(API_URL + "/register" , {
            userID ,username ,  email , password 
        })
    };
    
    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user") || "null"); 
    };   

    getUserData(userID:string){
        return axios.post(API_URL + "/getBreederProfile" , {userID});
    }; 

    changeUserData( userID:any , username:string , email:string  , address?:string , birthDate?:string,phone?:number){
        return axios.post(API_URL + "/changeBreederProfile" , {userID , username , email , address  , birthDate , phone});
    }; 
}

export default new AuthService();