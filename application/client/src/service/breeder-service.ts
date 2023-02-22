import axios from "axios";
const API_URL = "http://localhost:8000/api/v1/breeder";

class BreederService {
    
    
    getMypets(userID:any) {
        
        return axios.post(API_URL + "/getmypets" , {userID});
    }

    getAllInsurance(userID:any) {
        return axios.post(API_URL + "/getallinsurance" , {userID});

    }
}

export default new BreederService();