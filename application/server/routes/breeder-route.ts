
const router = require("express").Router();
import { Request , Response } from 'express';
import {  Wallets , Gateway} from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';
import {IPet} from '../interface/pet';

//  調用petcontract 的 queryallpets 方法 得到目前所有寵物的資料
router.get("/getmypets" , async(req:Request , res:Response ) => {
    try {
        
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'breeder.anrail.com', 'connection-breeder.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        

        
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(req.body.userID);
        if (!identity) {
            console.log('找不到用戶');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'bradmin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('railchannel');

        // Get the contract from the network.
        const contract = network.getContract('petcontract');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryDocType' , 'pet');
        console.log("這是queryDocType pet 返回值: " + result);
        const resultstr = result.toString('utf-8');
        const resltObject = JSON.parse(resultstr);
        console.log(resltObject);


        let mypetlist:{ Key: string, Record: IPet }[] = [];
        // const dataArray:[] = resltObject.data;
        resltObject.forEach( function(element:{
            Key:string,
            Record:IPet
        }) {
            
            if(element.Record.ownerID == req.body.userID){
                mypetlist.push(element);
            }
        });

        
        
        res.status(200).json({mypetlist});
        console.log(`我的寵物有: ${mypetlist}`);

        // 關閉 gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).send("查閱我的寵物失敗...")
        process.exit(1);
    }
});


//  查詢所有保險
router.get("/getallinsurance" , async(req:Request , res:Response ) => {
    try {
        
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'breeder.anrail.com', 'connection-breeder.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(req.body.userID);
        if (!identity) {
            console.log('找不到用戶');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'bradmin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('railchannel');

        // Get the contract from the network.
        const contract = network.getContract('petcontract');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryDocType' , 'insurance');
        console.log("這是queryDocType insurance 返回值: " + result);
        const resultstr = result.toString('utf-8');
        const resltObject = JSON.parse(resultstr);
        console.log(resltObject);


        let mypetlist:{ Key: string, Record: IPet }[] = [];
        // const dataArray:[] = resltObject.data;
        resltObject.forEach( function(element:{
            Key:string,
            Record:IPet
        }) {
            
            if(element.Record.ownerID == req.body.userID){
                mypetlist.push(element);
            }
        });

        
        
        res.status(200).json({mypetlist});
        console.log(`我的寵物有: ${mypetlist}`);

        // 關閉 gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).send("查閱我的寵物失敗...")
        process.exit(1);
    }
});

module.exports = router;

