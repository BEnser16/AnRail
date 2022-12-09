/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import { PetModel } from './pet-model';
import { Context, Contract } from 'fabric-contract-api';
import { UserModel } from './user-model';
import { count } from 'console';



export class PetContract extends Contract {

    public async initLedger(ctx:Context) {
        console.info('============= START : Initialize Ledger ===========');
        const pets:PetModel[] = [
            {
                medicalNumber:'001',
                name:'大黃',
                species:'狗',
                breed:'黃金獵犬',
                owner:'陳大平',
                ownerid:'F100700100',
                phone:'0900-277-277',
                chip:'已施打',
                birthday:'2001-10-10',
                gender:'公',
                bloodType:'1.1',
                ligation:'已結紮',
                allergy:'無',
                majorDiseases:'腫瘤',
                remark:'體型癰腫 個性溫馴',
                hospital:'高雄動物醫院'
            },
        ];

        const accounts:UserModel[] = [
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

        for(let i = 0; i < accounts.length; i++) {
            accounts[i].docType = 'account';
            await ctx.stub.putState(accounts[i].userID , Buffer.from(JSON.stringify(accounts[i])));
            console.info("create account > " , accounts[i]);
        }


        console.info('============= END : Initialize Ledger ===========');
    }

    public async queryPet(ctx:Context, petNumber:string): Promise<string> {
        const petAsBytes = await ctx.stub.getState(petNumber); // get the car from chaincode state
        if (!petAsBytes || petAsBytes.length === 0) {
            throw new Error(`${petNumber} does not exist`);
        }
        console.log(petAsBytes.toString());
        return petAsBytes.toString();
    }


    public async createPet(ctx:Context, petNumber:string , medicalNumber:string , name:string , species:string , breed:string, owner:string , ownerid:string ,phone:string , chip:string , birthday:string , gender:string , bloodType:string , ligation:string , allergy:string , majorDiseases:string , remark:string , hospital:string) {
        console.info('============= START : Create Pet ===========');

        const pet = {
            docType: 'pet',
            medicalNumber,
            name,
            species ,
            breed,
            owner,
            ownerid,
            phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital,
            
        };

        await ctx.stub.putState(petNumber, Buffer.from(JSON.stringify(pet)));
        console.info('============= END : Create Pet ===========');
    }

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
    

    public async changePetOwner(ctx:Context, petNumber:string, newOwner:string) {
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

    public async signupbreeder(ctx:Context , userID:string , email:string , password:string , role:string) {
        console.info('============= START : signup for a new account ===========');

        const user = {
            docType: 'account',
            userID: userID,
            email: email,
            password: password,
            role: role,
        }
        
        
        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(user)));
        
    
        console.info('============= END : Create Pet ===========');

    }

    
    

}

