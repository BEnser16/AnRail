#!/bin/bash

echo "刪除舊的證書資料"
sudo rm -r organizations/

echo "將 organizations 資料夾重新複製過來"
sudo cp -r ~/go/src/fabric-samples/test-network/organizations ~/go/src/fabric-samples/AnRail/explorer

echo "重新將私鑰命名"
sudo -i pushd ~/go/src/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore
sudo find -name ./*_sk
popd
