/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const router = require("express").Router();
import { Wallets, X509Identity } from 'fabric-network';
import * as  FabricCAServices from 'fabric-ca-client';
import * as path from 'path';
import * as fs from 'fs';

router.post("/register" , async(req:any , res:any) => {
    try {
        console.log("接受請求,伺服器執行註冊");
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../../network', 'organizations', 'peerOrganizations', 'hospital.anrail.com', 'connection-hospital.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 創建 CA 服務
        const caURL = ccp.certificateAuthorities['ca.hospital.anrail.com'].url;
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
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // 創建使用者資料
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'hospital.department1', enrollmentID: req.body.userID, role: 'client' }, adminUser);
        const enrollment = await ca.enroll({ enrollmentID: req.body.userID, enrollmentSecret: secret });
        const x509Identity : X509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'OrghospitalMSP',
            type: 'X.509',
        };
        await wallet.put(req.body.userID, x509Identity);
        console.log(`Successfully registered and enrolled admin user ${req.body.userID} and imported it into the wallet`);
        res.status(200).send("註冊成功");

    } catch (error) {
        res.status(400).send("註冊錯誤！")
        console.error(`Failed to register user ${req.body.userID}: ${error}`);
        process.exit(1);
    }
});

module.exports = router;