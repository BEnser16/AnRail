export class InsuranceContractModel {

    public docType?:string;

    public ContractID:string;

    public ProposerName:string;

    public ProposerID:string;

    public ProposerPhone:string;

    public ProposerBirthDate:string;

    public ProposerEmail:string;

    public ProposeAddress:string;

    public PetName:string;

    public PetGender:boolean;

    public PetChipID:string;

    public PetBornDate:string;

    public PetAge:number;

    public DogNorCat:boolean;

    public PetImage?:string;

    public Phrase:number;
    // 待審核 unverify 審核中 verify 審核完成 complete 
    public ContractState?:string;
}