export declare class PetInsuranceSC {
    docType?: string;
    ID: string;
    Contract: {
        Phrase: number;
        State: string;
        StartContractDate: string;
        EndContractDate: string;
    };
    Proposer: {
        Name: string;
        ID: string;
        BornDate: Date;
        PhoneNumber: string;
        Email: string;
    };
    ForPet: {
        DogNorCat: boolean;
        PetName: string;
        ChipID: string;
        BornDate: Date;
        ageYear: number;
        ageMonth: number;
    };
    getAge(birthDate: Date, yearNorMonth: boolean): number;
    CalculatePremium(DogNorCat: boolean, BornDate: Date): number;
}
