"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
//  智能合約 讓Server直接調用這裡的funtion
class PetContract extends fabric_contract_api_1.Contract {
    //  初始化 佈署完fabric 自動預先調用
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        //  預先存在一隻寵物基本資料
        const pets = [
            {
                name: '大黃',
                species: '狗',
                breed: '黃金獵犬',
                owner: '陳大平',
                ownerID: 'F100700100',
                phone: '0900-277-277',
                chipID: 'A001',
                birthday: '2001-10-10',
                gender: '公',
                bloodType: '1.1',
                ligation: false,
                allergy: '無',
                majorDiseases: '腫瘤',
                remark: '體型癰腫 個性溫馴',
                hospital: '高雄動物醫院'
            },
        ];
        //  預先設定兩組管理員帳號 飼主身份 醫院身份
        const accounts = [
            {
                userID: 'bradmin',
                email: 'bradmin@gmail.com',
                username: 'B11',
                birthDate: new Date("2023-02-06"),
                phone: 123,
                password: 'adminpw',
                role: 'admin'
            },
            {
                userID: 'hoadmin',
                email: 'hoadmin@gmail.com',
                username: 'B00',
                birthDate: new Date("2023-02-06"),
                phone: 123,
                password: 'adminpw',
                role: 'admin'
            },
        ];
        const Insurances = [
            {
                docType: 'insurance',
                ID: 'Insurance1',
                PolicyName: '米得寵',
                State: 'ISSUED',
                Phrase: 0,
                StartDate: null,
                EndDate: null,
                ProposerName: "",
                ProposerID: "",
                ProposeAddress: "高雄市",
                PetName: "小白",
                PetChipID: "",
                PetBornDate: null,
                DogNorCat: false,
            },
        ];
        //  利用putState 將上面的資料放入 fabric 帳本
        for (let i = 0; i < pets.length; i++) {
            pets[i].docType = 'pet';
            await ctx.stub.putState(pets[i].chipID, Buffer.from(JSON.stringify(pets[i])));
            console.info('Added <--> ', pets[i]);
        }
        for (let i = 0; i < accounts.length; i++) {
            accounts[i].docType = 'account';
            await ctx.stub.putState(accounts[i].userID, Buffer.from(JSON.stringify(accounts[i])));
            console.info("create account > ", accounts[i]);
        }
        for (const i of Insurances) {
            await ctx.stub.putState(i.ID, Buffer.from(JSON.stringify(i)));
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    //  查詢單隻寵物 依照chipID 晶片號
    async queryPet(ctx, chipID) {
        const petAsBytes = await ctx.stub.getState(chipID); // get the car from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${chipID} does not exist`);
        }
        console.log(petAsBytes.toString());
        return petAsBytes.toString();
    }
    //  新增一隻寵物 放入帳本
    async createPet(ctx, chipID, name, species, breed, owner, ownerID, phone, birthday, gender, bloodType, ligation, allergy, majorDiseases, remark, hospital) {
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
            hospital
        };
        await ctx.stub.putState(chipID, Buffer.from(JSON.stringify(pet)));
        console.info('============= END : Create Pet ===========');
    }
    //  查詢目前所有寵物
    async queryAllPets(ctx) {
        var e_1, _a;
        const startKey = '';
        const endKey = '';
        const allResults = [];
        try {
            for (var _b = __asyncValues(ctx.stub.getStateByRange(startKey, endKey)), _c; _c = await _b.next(), !_c.done;) {
                const { key, value } = _c.value;
                const strValue = Buffer.from(value).toString('utf8');
                let record;
                try {
                    record = JSON.parse(strValue);
                }
                catch (err) {
                    console.log(err);
                    record = strValue;
                }
                allResults.push({ Key: key, Record: record });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    //  更改寵物的擁有者
    async changePetOwner(ctx, chipID, newOwner) {
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
    async changePetInfo(ctx, chipID, Newname, Newspecies, Newbreed, Newowner, NewownerID, Newphone, Newbirthday, Newgender, NewbloodType, Newligation, Newallergy, NewmajorDiseases, Newremark, Newhospital) {
        console.info('============= START : changePetInfo ===========');
        const petAsBytes = await ctx.stub.getState(chipID); // get the pet from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${chipID} does not exist`);
        }
        const pet = JSON.parse(petAsBytes.toString());
        pet.name = Newname;
        pet.species = Newspecies;
        pet.breed = Newbreed;
        pet.owner = Newowner;
        pet.ownerID = NewownerID;
        pet.phone = Newphone;
        pet.birthday = Newbirthday;
        pet.gender = Newgender;
        pet.bloodType = NewbloodType;
        pet.ligation = Newligation;
        pet.allergy = Newallergy;
        pet.majorDiseases = NewmajorDiseases;
        pet.remark = Newremark;
        pet.hospital = Newhospital;
        await ctx.stub.putState(chipID, Buffer.from(JSON.stringify(pet)));
        console.info('============= END : changePetInfo ===========');
    }
    //  註冊一個 飼主身份的帳戶
    async signupbreeder(ctx, userID, username, email, password, role) {
        console.info('============= START : signup for a new account ===========');
        const user = {
            docType: 'account',
            userID: userID,
            username: username,
            email: email,
            password: password,
            role: role,
        };
        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(user)));
        console.info('============= END : Create Pet ===========');
    }
    //  依照 userID 查詢帳戶 返回帳戶資料
    async queryAccount(ctx, userID) {
        const accountAsBytes = await ctx.stub.getState(userID); // get the car from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${userID} does not exist`);
        }
        console.log(accountAsBytes.toString());
        return accountAsBytes.toString();
    }
    //  單類查詢
    async queryDocType(ctx, docType) {
        let queryString = { selector: {
                docType: ""
            } };
        queryString.selector.docType = docType;
        //  使用query json 字串進行 rich query
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString));
    }
    // public async purchaseInsurance() {
    // }
    // public async getAge(PetBornDate:Date , yearNorMonth:boolean): Promise<number> {
    //     const today = new Date();
    //     let years = today.getFullYear() - PetBornDate.getFullYear();
    //     let months = today.getMonth() - PetBornDate.getMonth();
    //     // 如果月份差值為負數，表示今年還沒到生日，年齡要扣 1 歲，並加上 12 個月
    //     if (months < 0) {
    //         years--;
    //         months += 12;
    //     }
    //     if(yearNorMonth) {
    //         return years;
    //     } else {
    //         return months;
    //     }
    // }
    //  新增寵物病歷紀錄 使用chipID綁定寵物
    async createPetRecord(ctx, recordType, recordID, chipID, date, type, doctor, describe, complete) {
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
    async changePetRecord(ctx, recordID, NewchipID, Newdate, Newtype, Newdoctor, Newdescribe, Newcomplete) {
        console.info('============= START : changePetRecord ===========');
        const petAsBytes = await ctx.stub.getState(recordID); // get the reocrd from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${recordID} does not exist`);
        }
        const record = JSON.parse(petAsBytes.toString());
        record.chipID = NewchipID;
        record.date = Newdate;
        record.type = Newtype;
        record.doctor = Newdoctor;
        record.describe = Newdescribe;
        record.complete = Newcomplete;
        await ctx.stub.putState(recordID, Buffer.from(JSON.stringify(record)));
        console.info('============= END : changePetRecord ===========');
    }
    // 查詢寵物病歷紀錄 使用chipID搜尋
    async queryRecord(ctx, recordType, chipID) {
        let queryString = { selector: {
                docType: "",
                chipID: ""
            } };
        queryString.selector.docType = recordType;
        queryString.selector.chipID = chipID;
        //  使用query json 字串進行 rich query
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString));
    }
    // GetAssetHistory returns the chain of custody for an asset since issuance.
    async GetAssetHistory(ctx, assetName) {
        let resultsIterator = await ctx.stub.getHistoryForKey(assetName);
        let results = await this.GetAllResults(resultsIterator, true);
        return JSON.stringify(results);
    }
    async GetQueryResultForQueryString(ctx, queryString) {
        const resultsIterator = await ctx.stub.getQueryResult(queryString);
        const results = await this.GetAllResults(resultsIterator, false);
        return JSON.stringify(results);
    }
    async GetAllResults(iterator, isHistory) {
        const allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                const jsonRes = {};
                console.log(res.value.value.toString('utf8'));
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = res.value.timestamp;
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    }
                    catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                }
                else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    }
                    catch (err) {
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
exports.PetContract = PetContract;
//# sourceMappingURL=petcontract.js.map