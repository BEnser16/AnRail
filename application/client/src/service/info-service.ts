import axios from "axios";
const API_URL = "http://localhost:8000/api/v1/info";

// For hospital
class InfoService {
    
    create(name:string , species:string, breed:string , owner:string ,ownerID:string, phone :string, chipID :string, birthday :string, gender :string, bloodType :string, ligation :boolean, allergy :string, majorDiseases :string, remark:string , hospital:string,formData:FormData){
        return axios.post(API_URL + "/createpet" , {name, species, breed , owner ,ownerID, phone , chipID , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital,formData});
    };

    get(chipID:string) {
        return axios.get(API_URL + "/" + chipID);
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

export default new InfoService();