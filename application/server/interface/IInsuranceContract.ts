export interface IInsuranceContract {

    docType?:string;

    ContractID:string;

    ProposerName:string;

    ProposerID:string;

    ProposerPhone:string;

    ProposerBirthDate:string;

    ProposerEmail:string;

    ProposeAddress:string;    
    
    PetName:string;

    PetGender:boolean;

    PetChipID:string;

    PetBornDate:string;

    PetAge:number;

    DogNorCat:boolean;

    PetImage?:string;

    Phrase:number;
    // 待審核 unverify 審核中 verify 審核完成 complete 
    ContractState?:string;
}