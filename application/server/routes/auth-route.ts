//  登入處理
const router = require("express").Router();
import { Request , Response } from 'express';
import {  Wallets , X509Identity , Gateway} from 'fabric-network';
import * as FabricCAServices from 'fabric-ca-client';
import * as path from 'path';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';


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
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        } else {
            console.log("管理員已存在！");
        }

        const loginUserIdentity = await wallet.get(req.body.userID);
        if (!loginUserIdentity) {
            console.log(loginUserIdentity);
            console.log('未知的使用者名稱...');
            return;
        } else {
            console.log("使用者名稱存在！");
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


router.post("/loginbreeder" , async(req:Request , res:Response) => {
    try {
        console.log("接受登入請求,執行");
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
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        } else {
            console.log("管理員已存在！");
        }

        const loginUserIdentity = await wallet.get(req.body.userID);
        if (!loginUserIdentity) {
            console.log(loginUserIdentity);
            console.log('未知的使用者名稱...');
            return;
        } else {
            console.log("使用者名稱存在！");
            const tokenObject = {_id:req.body.userID , role:req.body.role , email:req.body.email};
            const token = jwt.sign(tokenObject , "TOKENPASS");
            res.send({success:true , token:"JWT " + token , loginUserIdentity});
        }

        
    } catch (error) {
        res.status(400).send("登入錯誤！")
        console.error(`Failed to login user ${req.body.userID}: ${error}`);
        process.exit(1);
    }
});

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
        const adminUser = await provider.getUserContext(adminIdentity, 'bradmin');

        console.log("管理員帳號資訊：");
        console.log(adminUser);

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: '', enrollmentID: req.body.userID, role: 'client' }, adminUser);
        const enrollment = await ca.enroll({ enrollmentID: req.body.userID, enrollmentSecret: secret });
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

        await contract.submitTransaction('signupbreeder' , req.body.userID , req.body.email , req.body.password , 'breeder');
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).send("註冊成功");

    } catch (error) {
        res.status(400).send("註冊錯誤！")
        console.error(`Failed to register user ${req.body.userID}: ${error}`);
        process.exit(1);
    }
});

module.exports = router;