import { Context, Contract } from 'fabric-contract-api';
export declare class PetContract extends Contract {
    initLedger(ctx: Context): Promise<void>;
    queryPet(ctx: Context, chipID: string): Promise<string>;
    createPet(ctx: Context, chipID: string, name: string, species: string, breed: string, owner: string, ownerID: string, phone: string, birthday: string, gender: string, bloodType: string, ligation: boolean, allergy: string, majorDiseases: string, remark: string, hospital: string): Promise<void>;
    queryAllPets(ctx: Context): Promise<string>;
    changePetOwner(ctx: Context, chipID: string, newOwner: string): Promise<void>;
    changePetInfo(ctx: Context, chipID: string, Newname: string, Newspecies: string, Newbreed: string, Newowner: string, NewownerID: string, Newphone: string, Newbirthday: string, Newgender: string, NewbloodType: string, Newligation: boolean, Newallergy: string, NewmajorDiseases: string, Newremark: string, Newhospital: string): Promise<void>;
    signupbreeder(ctx: Context, userID: string, username: string, email: string, password: string, role: string): Promise<void>;
    changeAccountInfo(ctx: Context, userID: string, username: string, email: string, address?: string, birthDate?: Date, phone?: number): Promise<void>;
    queryAccount(ctx: Context, userID: string): Promise<string>;
    queryDocType(ctx: Context, docType: string): Promise<string>;
    createInsuranceContract(ctx: Context, PolicyID: string, ProposerID: string, ProposerName: string, ProposerPhone: string, ProposerBirthDate: string, ProposerEmail: string, ProposeAddress: string, PetName: string, PetGender: boolean, PetChipID: string, PetBornDate: string, PetAge: number, DogNorCat: boolean, Phrase: number): Promise<void>;
    createPetRecord(ctx: Context, recordType: string, recordID: string, chipID: string, date: string, type: string, doctor: string, describe: string, complete: boolean): Promise<void>;
    changePetRecord(ctx: Context, recordID: string, NewchipID: string, Newdate: string, Newtype: string, Newdoctor: string, Newdescribe: string, Newcomplete: boolean): Promise<void>;
    queryRecord(ctx: Context, recordType: string, chipID: string): Promise<string>;
    GetAssetHistory(ctx: Context, assetName: string): Promise<string>;
    GetQueryResultForQueryString(ctx: Context, queryString: string): Promise<string>;
    GetAllResults(iterator: any, isHistory: boolean): Promise<object[]>;
}
