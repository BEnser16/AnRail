/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetContract = void 0;
const { Contract } = require('fabric-contract-api');
//  智能合約 讓Server直接調用這裡的funtion
class PetContract extends Contract {
    //  搜尋資料內容的兩個函式
    async GetQueryResultForQueryString(ctx, queryString) {
        let resultsIterator = await ctx.stub.getQueryResult(queryString);
        let results = await this.GetAllResults(resultsIterator, false);
        return JSON.stringify(results);
    }
    async GetAllResults(iterator, isHistory) {
        let allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
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
                password: 'adminpw',
                role: 'admin'
            },
            {
                userID: 'hoadmin',
                email: 'hoadmin@gmail.com',
                username: 'B00',
                password: 'adminpw',
                role: 'admin'
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
        let queryString = {};
        queryString.selector = {};
        queryString.selector.docType = 'pet';
        //  使用query json 字串進行 rich query
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString));
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
    //  新增寵物病歷紀錄 使用chipID綁定寵物
    async createPetRecord(ctx, recordID, chipID, date, type, doctor, describe, complete) {
        console.info('============= START : Create Record ===========');
        const record = {
            docType: 'record',
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
    async queryRecord(ctx, chipID) {
        let queryString = {};
        queryString.selector = {};
        queryString.selector.docType = 'record';
        queryString.selector.chipID = chipID;
        //  使用query json 字串進行 rich query
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString));
    }
}
exports.PetContract = PetContract;
//# sourceMappingURL=petcontract.js.map