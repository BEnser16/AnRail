//  登入處理
const router = require("express").Router();
import { Request , Response } from 'express';
import {  Wallets , X509Identity , Gateway  } from 'fabric-network';
import * as FabricCAServices from 'fabric-ca-client';

import * as path from 'path';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

//  醫療人員登入
router.post("/loginhospital" , async(req:Request , res:Response) => {
    try {
        console.log("接受登入請求,執行");
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'hospital.anrail.com', 'connection-hospital.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 創建 CA 服務
        const caURL = ccp.certificateAuthorities['ca.hospital.anrail.com'].url;
        const ca = new FabricCAServices(caURL);

        // 用 fs 套件 控制 wallet 身份資料 
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // 確認是否有管理員存在
        const adminIdentity = await wallet.get('hoadmin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "hoadmin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            res.status(400).send("醫院管理員不存在！");
            return;
        } else {
            console.log("管理員已存在！");
        }

        const loginUserIdentity = await wallet.get(req.body.userID);
        if (!loginUserIdentity) {
            // console.log(loginUserIdentity);
            console.log('未知的使用者名稱...');
            return;
        } else {
            console.log("找到使用者名稱！");
            const tokenObject = {_id:req.body.userID  , role:req.body.role};
            const token = jwt.sign(tokenObject , "TOKENPASS");
            res.send({success:true , token:"JWT " + token , loginUserIdentity});
        }

        
    } catch (error) {
        res.status(400).send("登入錯誤！")
        console.error(`Failed to login user ${req.body.userID}: ${error}`);
        process.exit(1);
    }
});

//  一般飼主登入
router.post("/loginbreeder" , async(req:Request , res:Response) => {
    try {
        console.log("接受一般飼主登入請求,執行");
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'breeder.anrail.com', 'connection-breeder.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 創建 CA 服務
        const caURL = ccp.certificateAuthorities['ca.breeder.anrail.com'].url;
        const ca = new FabricCAServices(caURL);

        // 用 fs 套件 控制 wallet 身份資料 
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // 確認是否有管理員存在
        const adminIdentity = await wallet.get('bradmin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "bradmin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        } else {
            console.log("管理員已存在！");
        }

        const loginUserIdentity = await wallet.get(req.body.userID);
        if (!loginUserIdentity) {
            console.log(loginUserIdentity);
            console.log('未知的使用者名稱...');
            return ;
        } else {
            console.log("使用者名稱存在！");

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: req.body.userID , discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('railchannel');

            // Get the contract from the network.
            const contract = network.getContract('petcontract');

            const userobj = await contract.evaluateTransaction('queryAccount' , req.body.userID);
            
            console.log('Transaction has been evaluate');

            console.log(userobj);
            const userstr = new TextDecoder("utf-8").decode(userobj);
            const userjson = JSON.parse(userstr);

            if(req.body.password !== userjson.password) {
                res.status(400).send("密碼不正確!");
            } else {
                
                const tokenObject = {userID:req.body.userID ,userEmail:req.body.email , userName:req.body.username,role:req.body.role};
                const logindata = JSON.stringify(tokenObject);
                const token = jwt.sign(logindata , "TOKENPASS");
                res.status(200).send({success:true , token:"JWT " + token , logindata});
            }
            
            

            // Disconnect from the gateway.
            await gateway.disconnect();


           
        }

        
    } catch (error) {
        res.status(400).send("登入錯誤！")
        console.error(`Failed to login user ${req.body.userID}: ${error}`);
        process.exit(1);
    }
});

//  一般飼主註冊
router.post("/register" , async(req:Request , res:Response) => {
    try {
        console.log("接受請求,伺服器執行註冊");
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'breeder.anrail.com', 'connection-breeder.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 創建 CA 服務
        const caURL = ccp.certificateAuthorities['ca.breeder.anrail.com'].url;
        const ca = new FabricCAServices(caURL);

        // 用 fs 套件 控制 wallet 身份資料 
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // 確認用戶是否已經註冊過了
        const userIdentity = await wallet.get(req.body.userID);
        if (userIdentity) {
            console.log(`An identity for the user ${req.body.userID} already exists in the wallet`);
            return;
        }

        // 確認是否有管理員存在
        const adminIdentity = await wallet.get('bradmin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // 創建使用者資料
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const bradminUser = await provider.getUserContext(adminIdentity, 'bradmin');

        console.log("管理員帳號資訊：");
        console.log(bradminUser);
        console.log("結束--------");

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'breeder.department1', enrollmentID: req.body.userID, enrollmentSecret: req.body.password , role: 'client' }, bradminUser);
        const enrollment = await ca.enroll({ enrollmentID: req.body.userID, enrollmentSecret: secret});
        
        const x509Identity : X509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'OrgbreederMSP',
            type: 'X.509',
        };
        await wallet.put(req.body.userID, x509Identity);
        console.log(`Successfully registered and enrolled admin user ${req.body.userID} and imported it into the wallet`);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: req.body.userID , discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('railchannel');

        // Get the contract from the network.
        const contract = network.getContract('petcontract');

        await contract.submitTransaction('signupbreeder' , req.body.userID ,req.body.username , req.body.email , req.body.password , 'breeder');
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).send("新的註冊完成");

    } catch (error) {
        res.status(400).send("註冊錯誤！")
        console.error(`Failed to register user ${req.body.userID}: ${error}`);
        process.exit(1);
    }
});

//  查詢一般飼主個人資料
router.post("/getBreederProfile" , async(req:Request , res:Response) => {
    try {
        console.log("接受飼主取的帳戶資料請求,執行");
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'breeder.anrail.com', 'connection-breeder.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 創建 CA 服務
        const caURL = ccp.certificateAuthorities['ca.breeder.anrail.com'].url;
        const ca = new FabricCAServices(caURL);

        // 用 fs 套件 控制 wallet 身份資料 
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // 確認是否有管理員存在
        const adminIdentity = await wallet.get('bradmin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "bradmin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        } else {
            console.log("管理員已存在！");
        }

        const loginUserIdentity = await wallet.get(req.body.userID);
        if (!loginUserIdentity) {
            console.log(loginUserIdentity);
            console.log('未知的使用者名稱...');
            return ;
        } else {
            console.log("使用者名稱存在！");

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: req.body.userID , discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('railchannel');

            // Get the contract from the network.
            const contract = network.getContract('petcontract');

            const userobj = await contract.evaluateTransaction('queryAccount' , req.body.userID);
            
            console.log('Transaction has been evaluate');

           
            const userstr = new TextDecoder("utf-8").decode(userobj);
            const userjson = JSON.parse(userstr);
            console.log(userjson);
            
            res.status(200).send(userjson);
            
            
            

            // Disconnect from the gateway.
            await gateway.disconnect();


           
        }

        
    } catch (error) {
        res.status(400).send("登入錯誤！")
        console.error(`Failed to login user ${req.body.userID}: ${error}`);
        process.exit(1);
    }
});


//  修改一般飼主個人資料
router.post("/changeBreederProfile" , async(req:Request , res:Response) => {
    try {
        console.log("接受一般飼主更改個人資料請求,執行");
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'breeder.anrail.com', 'connection-breeder.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 創建 CA 服務
        const caURL = ccp.certificateAuthorities['ca.breeder.anrail.com'].url;
        const ca = new FabricCAServices(caURL);

        // 用 fs 套件 控制 wallet 身份資料 
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // 確認是否有管理員存在
        const adminIdentity = await wallet.get('bradmin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "bradmin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        } else {
            console.log("管理員已存在！");
        }

        const loginUserIdentity = await wallet.get(req.body.userID);
        if (!loginUserIdentity) {
            console.log(loginUserIdentity);
            console.log('未知的使用者名稱...');
            return ;
        } else {
            console.log("使用者名稱存在！");

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: req.body.userID , discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('railchannel');

            // Get the contract from the network.
            const contract = network.getContract('petcontract');

            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            await contract.submitTransaction('changeAccountInfo', req.body.userID, req.body.username, req.body.email, req.body.address, req.body.birthDate, req.body.phone);
            console.log('Transaction has been submitted 更改飼主帳戶基本資料交易已送出...');
            res.status(200).send("evaluate transaction 更新飼主帳戶資料成功...");


            // Disconnect from the gateway.
            await gateway.disconnect();
           
        }

        
    } catch (error) {
        res.status(400).send("登入錯誤！")
        console.error(`Failed to login user ${req.body.userID}: ${error}`);
        process.exit(1);
    }
});

module.exports = router;