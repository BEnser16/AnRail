#!/bin/bash

echo "刪除舊的證書資料"
sudo rm -r organizations/

echo "將 organizations 資料夾重新複製過來"
sudo cp -r ~/go/src/fabric-samples/test-network/organizations ~/go/src/fabric-samples/AnRail/explorer
sudo cp -r ~/go/src/fabric-samples/AnRail/network/organizations ~/go/src/fabric-samples/AnRail/explorer


