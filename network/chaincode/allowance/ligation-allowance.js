//  絕育補助鏈碼

'use strict';

const { Contract } = require('fabric-contract-api');

class Ligation extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const pets = [];

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

    async createPet(ctx, petNumber, medicalNumber , name , species , breed , owner , phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital) {
        console.info('============= START : Create Pet ===========');

        const pet = {
            docType: 'pet',
            medicalNumber,
            name,
            species ,
            breed,
            owner,
            phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital,
            
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