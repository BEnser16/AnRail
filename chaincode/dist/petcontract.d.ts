import { Context, Contract } from 'fabric-contract-api';
export declare class PetContract extends Contract {
    initLedger(ctx: Context): Promise<void>;
    queryPet(ctx: Context, chipID: string): Promise<string>;
    createPet(ctx: Context, chipID: string, name: string, species: string, breed: string, owner: string, ownerID: string, phone: string, birthday: string, gender: string, bloodType: string, ligation: boolean, allergy: string, majorDiseases: string, remark: string, hospital: string): Promise<void>;
    queryAllPets(ctx: Context): Promise<string>;
    changePetOwner(ctx: Context, chipID: string, newOwner: string): Promise<void>;
    changePetInfo(ctx: Context, chipID: string, Newname: string, Newspecies: string, Newbreed: string, Newowner: string, NewownerID: string, Newphone: string, Newbirthday: string, Newgender: string, NewbloodType: string, Newligation: boolean, Newallergy: string, NewmajorDiseases: string, Newremark: string, Newhospital: string): Promise<void>;
    signupbreeder(ctx: Context, userID: string, username: string, email: string, password: string, role: string): Promise<void>;
    queryAccount(ctx: Context, userID: string): Promise<string>;
}
