import { Context, Contract } from 'fabric-contract-api';
export declare class PetContract extends Contract {
    initLedger(ctx: Context): Promise<void>;
    queryPet(ctx: Context, petNumber: string): Promise<string>;
    createPet(ctx: Context, petNumber: string, medicalNumber: string, name: string, species: string, breed: string, owner: string, ownerid: string, phone: string, chip: string, birthday: string, gender: string, bloodType: string, ligation: string, allergy: string, majorDiseases: string, remark: string, hospital: string): Promise<void>;
    queryAllPets(ctx: Context): Promise<string>;
    changePetOwner(ctx: Context, petNumber: string, newOwner: string): Promise<void>;
    signupbreeder(ctx: Context, userID: string, email: string, password: string, role: string): Promise<void>;
    queryAccount(ctx: Context, userID: string): Promise<string>;
}
