import axios from "axios";
const API_URL = "http://localhost:8000/api/v1/breeder";

class BreederService {
    
    
    getMypets(userID:any) {
        
        return axios.post(API_URL + "/getmypets" , {userID});
    }

    getAllInsurance(userID:any) {
        return axios.post(API_URL + "/getallinsurance" , {userID});

    }

    enrollInsurance(PolicyID:string ,ProposerID:string , ProposerName:string , ProposerPhone:string , ProposerBirthDate:string ,ProposerEmail:string 
        ,ProposeAddress:string , PetName:string , PetGender:boolean , PetChipID:string , PetBornDate:string , PetAge:number, DogNorCat:boolean , Phrase:number) {
            
        return axios.post(API_URL + "/erollInsurance" , {PolicyID ,ProposerID , ProposerName , ProposerPhone, ProposerBirthDate ,ProposerEmail 
            ,ProposeAddress , PetName , PetGender , PetChipID , PetBornDate , PetAge, DogNorCat , Phrase});

    }
}

export default new BreederService();