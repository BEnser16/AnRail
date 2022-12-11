/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
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
class PetContract extends fabric_contract_api_1.Contract {
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const pets = [
            {
                medicalNumber: '001',
                name: '大黃',
                species: '狗',
                breed: '黃金獵犬',
                owner: '陳大平',
                ownerid: 'F100700100',
                phone: '0900-277-277',
                chip: '已施打',
                birthday: '2001-10-10',
                gender: '公',
                bloodType: '1.1',
                ligation: '已結紮',
                allergy: '無',
                majorDiseases: '腫瘤',
                remark: '體型癰腫 個性溫馴',
                hospital: '高雄動物醫院'
            },
        ];
        const accounts = [
            {
                userID: 'admin',
                email: 'admin@gmail.com',
                password: 'adminpw',
                role: 'admin'
            },
        ];
        for (let i = 0; i < pets.length; i++) {
            pets[i].docType = 'pet';
            await ctx.stub.putState('100' + i, Buffer.from(JSON.stringify(pets[i])));
            console.info('Added <--> ', pets[i]);
        }
        for (let i = 0; i < accounts.length; i++) {
            accounts[i].docType = 'account';
            await ctx.stub.putState(accounts[i].userID, Buffer.from(JSON.stringify(accounts[i])));
            console.info("create account > ", accounts[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    async queryPet(ctx, petNumber) {
        const petAsBytes = await ctx.stub.getState(petNumber); // get the car from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${petNumber} does not exist`);
        }
        console.log(petAsBytes.toString());
        return petAsBytes.toString();
    }
    async createPet(ctx, petNumber, medicalNumber, name, species, breed, owner, ownerid, phone, chip, birthday, gender, bloodType, ligation, allergy, majorDiseases, remark, hospital) {
        console.info('============= START : Create Pet ===========');
        const pet = {
            docType: 'pet',
            medicalNumber,
            name,
            species,
            breed,
            owner,
            ownerid,
            phone, chip, birthday, gender, bloodType, ligation, allergy, majorDiseases, remark, hospital,
        };
        await ctx.stub.putState(petNumber, Buffer.from(JSON.stringify(pet)));
        console.info('============= END : Create Pet ===========');
    }
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
    async changePetOwner(ctx, petNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');
        const petAsBytes = await ctx.stub.getState(petNumber); // get the pet from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${petNumber} does not exist`);
        }
        const pet = JSON.parse(petAsBytes.toString());
        pet.owner = newOwner;
        await ctx.stub.putState(petNumber, Buffer.from(JSON.stringify(pet)));
        console.info('============= END : changeCarOwner ===========');
    }
    async signupbreeder(ctx, userID, email, password, role) {
        console.info('============= START : signup for a new account ===========');
        const user = {
            docType: 'account',
            userID: userID,
            email: email,
            password: password,
            role: role,
        };
        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(user)));
        console.info('============= END : Create Pet ===========');
    }
    async queryAccount(ctx, userID) {
        const accountAsBytes = await ctx.stub.getState(userID); // get the car from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${userID} does not exist`);
        }
        console.log(accountAsBytes.toString());
        return accountAsBytes.toString();
    }
}
exports.PetContract = PetContract;
//# sourceMappingURL=petcontract.js.map