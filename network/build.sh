#!/bin/bash

# 將fabric工具設定至環境變數
export PATH=${PWD}/fabric-tool/bin:$PATH
export VERBOSE=false #  把go module關掉 才能用go mod

echo "一、清理环境"
./down.sh

echo "二、生成证书和秘钥（ MSP 材料），生成结果将保存在 crypto-config 文件夹中"
cryptogen generate --config=crypto-config.yaml

echo "三、生成創世 通道 錨節點相關文件"
configtxgen -profile TwoOrgsOrdererGenesis \
-outputBlock ./channel-artifacts/genesis.block \
-channelID fabric-channel 

echo "四、使用configtxgen生成通道文件"
configtxgen -profile TwoOrgsChannel \
-outputCreateChannelTx ./channel-artifacts/channel.tx \
-channelID mychannel

echo "生成组织錨節點文件"
configtxgen -profile TwoOrgsChannel \
-outputAnchorPeersUpdate ./channel-artifacts/hospitalMSPanchors.tx \
-channelID mychannel -asOrg HospitalMSP

echo "生成组织2锚節點文件"
configtxgen -profile TwoOrgsChannel \
-outputAnchorPeersUpdate ./channel-artifacts/insuranceMSPanchors.tx \
-channelID mychannel -asOrg InsuranceMSP 

echo "區塊鏈 ： 启动"
docker-compose up -d

