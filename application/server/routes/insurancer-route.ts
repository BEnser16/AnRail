const router = require("express").Router();
import { Request , Response } from 'express';
import {  Wallets , Gateway} from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';
import { IInsuranceContract } from '../interface/IInsuranceContract';


//  調用petcontract 的 queryDocType 方法 得到目前所有保單的資料
router.post("/getInsuranceContracts" , async(req:Request , res:Response ) => {
    try {
        console.log("開始查詢doctype:contract...");
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'insurance.anrail.com', 'connection-insurance.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('inadmin');
        if (!identity) {
            console.log('找不到用戶');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'inadmin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('railchannel');

        // Get the contract from the network.
        const contract = network.getContract('petcontract');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryDocType' , 'contract');
        console.log("這是queryDocType contract 返回值: " + result);
        const resultstr = result.toString('utf-8');
        const resltObject = JSON.parse(resultstr);
        console.log(resltObject);
        
        
        res.status(200).json(resltObject);
        console.log(`query contract resultobject : ${resltObject}`);

        // 關閉 gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).send("查閱我的寵物失敗...")
        process.exit(1);
    }
});

//  更改保單資料
router.post("/changeInsuranceContractState" , async(req:Request , res:Response ) => {
    try {
        console.log("開始更改保單... body : " + JSON.stringify(req.body));
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'insurance.anrail.com', 'connection-insurance.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        
        
        // 這裡要用PropserID 代表 userID.
        const identity = await wallet.get('inadmin');
        if (!identity) {
            console.log('找不到用戶');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'inadmin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('railchannel');

        // Get the contract from the network.
        const contract = network.getContract('petcontract');

        // Evaluate the specified transaction.
        await contract.submitTransaction('changeInsuranceContractState', req.body.contractID , req.body.contractState );
        console.log('Transaction has been submitted 更改保單資料交易已送出...');
        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).send("更改保單資料完成");

        // 關閉 gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).send("更改保單資料完成..")
        process.exit(1);
    }
});



module.exports = router;

