
import { PetModel } from './pet-model';
import { Context, Contract } from 'fabric-contract-api';
import { UserModel } from './user-model';
import { InsuranceModel } from './insurance-model';
import { InsuranceContractModel } from './InsuranceContractModel';
import { InsurancePolicyModel } from './InsurancePolicyModel';


//  智能合約 讓Server直接調用這裡的funtion
export class PetContract extends Contract {

    //  初始化 佈署完fabric 自動預先調用
    public async initLedger(ctx:Context) {
        console.info('============= START : Initialize Ledger ===========');
        //  預先存在一隻寵物基本資料
        const pets:PetModel[] = [
            {
                
                name:'大黃',
                species:'狗',
                breed:'黃金獵犬',
                owner:'陳大平',
                ownerID:'F100700100',
                phone:'0900-277-277',
                chipID:'A001',
                birthday:'2001-10-10',
                gender:'公',
                bloodType:'1.1',
                ligation:false,
                allergy:'無',
                majorDiseases:'腫瘤',
                remark:'體型癰腫 個性溫馴',
                hospital:'高雄動物醫院',
                imgID:""
            },
            {
                
                name:'小花',
                species:'貓',
                breed:'MIX',
                owner:'黃小萍',
                ownerID:'F200700100',
                phone:'0900-277-277',
                chipID:'A002',
                birthday:'2019-10-10',
                gender:'公',
                bloodType:'1.1',
                ligation:false,
                allergy:'無',
                majorDiseases:'腫瘤',
                remark:'體型癰腫 個性溫馴',
                hospital:'台中動物醫院'
            },
            {
                
                name:'阿白',
                species:'狗',
                breed:'MIX',
                owner:'陳大平',
                ownerID:'F100700100',
                phone:'0900-277-277',
                chipID:'A003',
                birthday:'2017-10-10',
                gender:'公',
                bloodType:'1.1',
                ligation:false,
                allergy:'無',
                majorDiseases:'腫瘤',
                remark:'個性兇猛',
                hospital:'高雄動物醫院'
            },
            {
                
                name:'阿黑',
                species:'狗',
                breed:'MIX',
                owner:'許傑',
                ownerID:'F300700100',
                phone:'0900-277-277',
                chipID:'A004',
                birthday:'2020-10-10',
                gender:'公',
                bloodType:'1.1',
                ligation:false,
                allergy:'無',
                majorDiseases:'皮膚病',
                remark:'後腿受傷',
                hospital:'高雄動物醫院'
            },
        ];

        //  預先設定兩組管理員帳號 飼主身份 醫院身份
        const accounts:UserModel[] = [
            {
                userID: 'bradmin',
                email: 'bradmin@gmail.com',
                username:'B11',
                birthDate: new Date("2023-02-06"),
                phone: 123 ,
                password: 'adminpw',
                role: 'admin'
            },
            {
                userID: 'hoadmin',
                email: 'hoadmin@gmail.com',
                username:'B00',
                birthDate: new Date("2023-02-06"),
                phone: 123 ,
                password: 'adminpw',
                role: 'admin'
            },
        ];

        const InsurancePolicys:InsurancePolicyModel[] = [
            {
                docType:'insurance',
                PolicyID:'insurance1',
                PolicyName:'米得寵',
                Description:"養毛小孩所需費用比您想的更多，讓保險公司為您分散風險吧!",
                State:'ISSUED',
                Fee:1900,
                Duration:"一年",
                Compensation:1000,
                StartDate:null,
                EndDate:null,
                EnrolledProposerIDList:[]
                
            },
        ];

        
        //  利用putState 將上面的資料放入 fabric 帳本
        for (let i = 0; i < pets.length; i++) {
            pets[i].docType = 'pet';
            await ctx.stub.putState(pets[i].chipID, Buffer.from(JSON.stringify(pets[i])));
            console.info('Added <--> ', pets[i]);
        }

        for(let i = 0; i < accounts.length; i++) {
            accounts[i].docType = 'account';
            await ctx.stub.putState(accounts[i].userID , Buffer.from(JSON.stringify(accounts[i])));
            console.info("create account > " , accounts[i]);
        }

        for(const i of InsurancePolicys) {
            await ctx.stub.putState(i.PolicyID , Buffer.from(JSON.stringify(i)));
        }

        

        console.info('============= END : Initialize Ledger ===========');
    }

    //  查詢單隻寵物 依照chipID 晶片號
    public async queryPet(ctx:Context, chipID:string): Promise<string> {
        const petAsBytes = await ctx.stub.getState(chipID); // get the car from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${chipID} does not exist`);
        }
        console.log(petAsBytes.toString());
        return petAsBytes.toString();
    }

    //  新增一隻寵物 放入帳本
    public async createPet(ctx:Context, chipID:string, name:string, species:string, breed:string, owner:string, ownerID:string, phone:string, birthday:string, gender:string, bloodType:string, ligation:boolean, allergy:string, majorDiseases:string, remark:string, hospital:string,imgID:string) {
        console.info('============= START : Create Pet ===========');

        const pet = {
            docType: 'pet',
            name,
            species,
            breed,
            owner,
            ownerID,
            phone,
            birthday,
            gender,
            bloodType,
            ligation,
            allergy,
            majorDiseases,
            remark,
            hospital,
            imgID
        };

        await ctx.stub.putState(chipID, Buffer.from(JSON.stringify(pet)));
        console.info('============= END : Create Pet ===========');
    }

    //  查詢目前所有寵物
    public async queryAllPets(ctx:Context): Promise<string> {
        const startKey = '';
        const endKey = '';
        const allResults:{ Key: string, Record: string }[] = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record:string;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    
    //  更改寵物的擁有者
    public async changePetOwner(ctx:Context, chipID:string, newOwner:string) {
        console.info('============= START : changePetOwner ===========');

        const petAsBytes = await ctx.stub.getState(chipID); // get the pet from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${chipID} does not exist`);
        }
        const pet = JSON.parse(petAsBytes.toString());
        pet.owner = newOwner;

        await ctx.stub.putState(chipID, Buffer.from(JSON.stringify(pet)));
        console.info('============= END : changePetOwner ===========');
    }

    //  更改寵物的資料
    public async changePetInfo(ctx:Context, chipID:string, Newname:string, Newspecies:string, Newbreed:string, Newowner:string, NewownerID:string, Newphone:string, Newbirthday:string, Newgender:string, NewbloodType:string, Newligation:boolean, Newallergy:string, NewmajorDiseases:string, Newremark:string, Newhospital:string) {
        console.info('============= START : changePetInfo ===========');

        const petAsBytes = await ctx.stub.getState(chipID); // get the pet from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${chipID} does not exist`);
        }
        const pet = JSON.parse(petAsBytes.toString());
        pet.name = Newname
        pet.species = Newspecies
        pet.breed = Newbreed
        pet.owner = Newowner
        pet.ownerID = NewownerID
        pet.phone = Newphone
        pet.birthday = Newbirthday
        pet.gender = Newgender
        pet.bloodType = NewbloodType
        pet.ligation = Newligation
        pet.allergy = Newallergy
        pet.majorDiseases = NewmajorDiseases
        pet.remark = Newremark
        pet.hospital = Newhospital

        await ctx.stub.putState(chipID, Buffer.from(JSON.stringify(pet)));
        console.info('============= END : changePetInfo ===========');
    }

    //  註冊一個 飼主身份的帳戶
    public async signupbreeder(ctx:Context , userID:string , username:string , email:string , password:string , role:string) {
        console.info('============= START : signup for a new account ===========');

        const user:UserModel = {
            docType: 'account',
            userID: userID,
            username: username,
            email: email,
            password: password,
            role: role,
        }
        
        
        await ctx.stub.putState(userID , Buffer.from(JSON.stringify(user)));
        
    
        console.info('============= END : Create Pet ===========');

    }

    //  更改飼主帳戶的個人資料
    public async changeAccountInfo(ctx:Context, userID:string , username:string , email:string  , address?:string , birthDate?:Date,phone?:number) {
        console.info('============= START : changeAccountInfo ===========');

        const accountAsBytes = await ctx.stub.getState(userID); // get the pet from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${userID} does not exist`);
        }
        const account:UserModel = JSON.parse(accountAsBytes.toString());
        account.userID = userID
        account.username = username
        account.email = email
        account.address = address
        account.birthDate = birthDate
        account.phone = phone

        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(account)));
        console.info('============= END : changeAccountInfo ===========');
    }

    //  依照 userID 查詢帳戶 返回帳戶資料
    public async queryAccount(ctx:Context, userID:string): Promise<string> {
        const accountAsBytes = await ctx.stub.getState(userID); 
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${userID} does not exist`);
        }
        console.log(accountAsBytes.toString());
        return accountAsBytes.toString();
    }

    //  單類查詢
    public async queryDocType(ctx:Context , docType:string ) {
        let queryString = {selector: {
            docType:""   
        }};
        
        queryString.selector.docType = docType;
        
        //  使用query json 字串進行 rich query
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString));
    }

    //  創建一個新保單 進行投保 將保險人ID Eroll List
    public async createInsuranceContract(ctx:Context ,PolicyID:string ,ProposerID:string , ProposerName:string , ProposerPhone:string , ProposerBirthDate:string ,ProposerEmail:string 
        ,ProposeAddress:string , PetName:string , PetGender:boolean , PetChipID:string , PetBornDate:string , PetAge:number, DogNorCat:boolean , Phrase:number ) {
        
        const newInsuranceContract:InsuranceContractModel = {
            docType:"contract",
            ContractID:"contract1",
            ProposerID:ProposerID,
            ProposerName:ProposerName,
            ProposerPhone:ProposerPhone,
            ProposerBirthDate:ProposerBirthDate,
            ProposerEmail:ProposerEmail,
            ProposeAddress:ProposeAddress,
            PetName:PetName,
            PetGender:PetGender,
            PetChipID:PetChipID,
            PetBornDate:PetBornDate,
            PetAge:PetAge,
            DogNorCat:DogNorCat,
            
            Phrase:Phrase

        }

        await ctx.stub.putState(newInsuranceContract.ContractID , Buffer.from(JSON.stringify(newInsuranceContract)));

        const policyAsBytes = await ctx.stub.getState(PolicyID); // get the pet from chaincode state
        if (!policyAsBytes || policyAsBytes.length === 0) {
            throw new Error(`${PolicyID} does not exist`);
        }
        const policy:InsurancePolicyModel = JSON.parse(policyAsBytes.toString());
        policy.EnrolledProposerIDList.push(ProposerID);
        

        await ctx.stub.putState(PolicyID, Buffer.from(JSON.stringify(policy)));
        console.info('============= END : createInsuranceContract ===========');
    }

    //  新增寵物病歷紀錄 使用chipID綁定寵物
    public async createPetRecord(ctx:Context,recordType:string, recordID:string ,chipID:string, date:string, type:string, doctor:string, describe:string, complete:boolean) {
        
        console.info('============= START : Create Record ===========');

        const record = {
            docType: recordType,
            chipID,
            date,
            type,
            doctor,
            describe,
            complete,
        };

        await ctx.stub.putState(recordID, Buffer.from(JSON.stringify(record)));
        console.info('============= END : Create Record ===========');
    }

    //  更改病歷的資料
    public async changePetRecord(ctx:Context,recordID:string ,NewchipID:string, Newdate:string, Newtype:string, Newdoctor:string, Newdescribe:string, Newcomplete:boolean) {
        console.info('============= START : changePetRecord ===========');

        const petAsBytes = await ctx.stub.getState(recordID); // get the reocrd from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${recordID} does not exist`);
        }
        const record = JSON.parse(petAsBytes.toString());
        record.chipID = NewchipID
        record.date = Newdate
        record.type = Newtype
        record.doctor = Newdoctor
        record.describe = Newdescribe
        record.complete = Newcomplete

        await ctx.stub.putState(recordID, Buffer.from(JSON.stringify(record)));
        console.info('============= END : changePetRecord ===========');
    }


    // 查詢寵物病歷紀錄 使用chipID搜尋
    public async queryRecord(ctx:Context, recordType:string, chipID:string) {
        
        let queryString = {selector: {
            docType:"",
            chipID:""   
        }};
        
        queryString.selector.docType = recordType;
        queryString.selector.chipID = chipID;
        //  使用query json 字串進行 rich query
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); 
    }

    // GetAssetHistory returns the chain of custody for an asset since issuance.
	async GetAssetHistory(ctx:Context, assetName:string) {

		let resultsIterator = await ctx.stub.getHistoryForKey(assetName);
		let results = await this.GetAllResults(resultsIterator, true);

		return JSON.stringify(results);
	}




    public async GetQueryResultForQueryString(ctx: Context, queryString: string): Promise<string> {
        const resultsIterator = await ctx.stub.getQueryResult(queryString);
        const results = await this.GetAllResults(resultsIterator, false);
        return JSON.stringify(results);
    }
    
    public async GetAllResults(iterator: any, isHistory: boolean): Promise<object[]> {
        const allResults: object[] = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
            const jsonRes: any = {};
            console.log(res.value.value.toString('utf8'));
            if (isHistory && isHistory === true) {
                jsonRes.TxId = res.value.tx_id;
                jsonRes.Timestamp = res.value.timestamp;
                try {
                jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                console.log(err);
                jsonRes.Value = res.value.value.toString('utf8');
                }
            } else {
                jsonRes.Key = res.value.key;
                try {
                jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                console.log(err);
                jsonRes.Record = res.value.value.toString('utf8');
                }
            }
            allResults.push(jsonRes);
            }
            res = await iterator.next();
        }
        iterator.close();
        return allResults;
    }
    

}

