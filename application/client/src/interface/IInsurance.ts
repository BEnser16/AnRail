export interface IInsurance {
    Key:string,
    Record:{
        docType?:string;

        ID:string;

        PolicyName:string;

        State:string;

        Phrase:number;

        StartDate:Date;

        EndDate:Date;

        ProposerName:string;

        ProposeID:string;

        PetChipID:string;

        PetBornDate:Date;

        DogNorCat:boolean;

    }
}