/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Pet extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const pets = [
            {
                medicalNumber: "100000",
                name: "大黃",
                species: "狗",
                breed: "黃金獵犬",
                owner: "韓蛞蝓",
                phone: "0977008008",
                chip: "A001001",
                birthday: "2010-10-30",
                gender: "公",
                bloodType: "B",
                ligation: false,
                allergy: "香蕉",
                majorDiseases: "腫瘤",
                remark: "超肥黃金獵犬",
                hospital: "寵物醫院A",
            },
        ];

        for (let i = 0; i < pets.length; i++) {
            pets[i].docType = 'pet';
            await ctx.stub.putState('PET' + i, Buffer.from(JSON.stringify(pets[i])));
            console.info('Added <--> ', pets[i]);
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

    async createCar(ctx, petNumber, name, breed, age, owner) {
        console.info('============= START : Create Pet ===========');

        const pet = {
            name,
            docType: 'pet',
            breed,
            age,
            owner,
        };

        await ctx.stub.putState(petNumber, Buffer.from(JSON.stringify(pet)));
        console.info('============= END : Create Pet ===========');
    }

    async queryAllPets(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
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

}

module.exports = Pet;