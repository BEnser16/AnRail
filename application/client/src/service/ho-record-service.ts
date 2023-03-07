import axios from "axios";
const API_URL = "http://localhost:8000/api/v1/record";

// For hospital
class HoRecordService {
    
    create(recordID:string , chipID:string , date:string, type:string, doctor:string, describe:string, complete:true){
        return axios.post(API_URL + "/createrecord" , {recordID , chipID , date , type, doctor , describe , complete});
    }

    getallrecord() {
        return axios.post(API_URL + "/getallrecord");
    }
    
    delete(chipID:string) {
        return axios.delete(API_URL + "/" + chipID);
    }

    patch( chipID:string , name:string , species:string, breed:string , owner:string ,ownerID:string, phone :string, birthday :string, gender :string, bloodType :string, ligation :boolean, allergy :string, majorDiseases :string, remark:string , hospital:string) {
        return axios.patch(API_URL + "/" + chipID , {name, species, breed , owner ,ownerID, phone  , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital});
    }

    getAllpets() {
        return axios.get(API_URL + "/getallpets");
    }
}

export default new HoRecordService();
