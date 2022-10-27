#!/bin/bash

# 設定二進制工具的路徑
export PATH=${PWD}/../bin:$PATH
# 設定通道配置 configtx 路徑
export FABRIC_CFG_PATH=${PWD}/configtx

# 載入幫助文件與終端設定
. scripts/utils.sh

echo "清理环境"
./down.sh

echo "清除錢包殘留資料"
rm -rf ./chaincode/record/lib/wallet/*

#   -------------定義函式-------------

#   使用 fabric CA 生成組織證書資料
function createOrgs() {

    # 使用 Fabric CA 生成
    infoln "使用 fabric ca 生成證書和密鑰..."
    infoln "---docker-compose-ca 啟動 ca server 服務---"
    docker-compose -f docker/docker-compose-ca.yaml up -d
    . organizations/fabric-ca/enroll.sh #執行ca 註冊

    while :
        do
            if [ ! -f "organizations/fabric-ca/bank/tls-cert.pem" ]; then
                sleep 1
            else
                break
            fi
        done

        infoln "Creating Org bank Identities"
        createOrgbank

        infoln "Creating Org breeder Identities"
        createOrgbreeder

        infoln "Creating Org government Identities"
        createOrggovernment

        infoln "Creating Org hospital Identities"
        createOrghospital

        infoln "Creating Org insurance Identities"
        createOrginsurance

        infoln "Creating Org pthospital Identities"
        createOrgpthospital

        infoln "Creating Orderer Org Identities"
        createOrderer

    

    # 為組織生成通道配置文件
    infoln "---為組織生成通道配置文件---"
    ./organizations/ccp-generate.sh
}

# 為排序服務 用 configtxgen 生成創世區塊
function createConsortium() {
    infoln "為排序通道 使用 configtxgen 生成創世區塊..."
    configtxgen -profile Genesis -channelID system-channel -outputBlock ./system-genesis-block/genesis.block
}

#   執行network.sh中networkup的內容
function networkUp() {
    
    createOrgs
    createConsortium
    
    infoln "啟用 docker 服務"
    docker-compose -f docker/docker-compose-couch.yaml -f docker/docker-compose-net.yaml up -d

}

# 使用 createChannel 腳本創建通道 
# 更新每個組織的錨節點
function createChannel() {

    #   步驟一 產生channel 的區塊
    echo "输出创建通道的交易 配置應用通道 創建channel.tx 區塊"
    configtxgen -outputCreateChannelTx ./system-genesis-block/channel.tx -profile Channel -channelID allowancechannel

    #   步驟二 創建通道
    echo "在cli bank 創建 allowancechannel 通道"
    docker exec clibank bash -c "peer channel create -c allowancechannel --orderer orderer.anrail.com:7050 -f ./system-genesis-block/channel.tx --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem"
    
    echo "将cli bank 创建的allowancechannel.block 分发给需要加入此通道的容器 breeder"
    docker cp clibank:/opt/gopath/src/github.com/hyperledger/fabric/peer/allowancechannel.block ./system-genesis-block
    docker cp  ./system-genesis-block/allowancechannel.block  clibreeder:/opt/gopath/src/github.com/hyperledger/fabric/peer/allowancechannel.block
    echo "将cli bank 创建的allowancechannel.block 分發給 government"
    docker cp  ./system-genesis-block/allowancechannel.block  cligovernment:/opt/gopath/src/github.com/hyperledger/fabric/peer/allowancechannel.block
    echo "将cli bank 创建的allowancechannel.block 分發給 hospital"
    docker cp  ./system-genesis-block/allowancechannel.block  clihospital:/opt/gopath/src/github.com/hyperledger/fabric/peer/allowancechannel.block
    echo "将cli bank 创建的allowancechannel.block 分發給 insurance"
    docker cp  ./system-genesis-block/allowancechannel.block  cliinsurance:/opt/gopath/src/github.com/hyperledger/fabric/peer/allowancechannel.block

    echo "等待15秒"
    sleep 15 

    #   步驟三 節點加入通道
    echo "把節點加入 allowancechannel 通道 用來完成補助流程"
    docker exec -it clibank bash -c "peer channel join -b allowancechannel.block"
    docker exec -it clibreeder bash -c "peer channel join -b allowancechannel.block"
    docker exec -it cligovernment bash -c "peer channel join -b allowancechannel.block"
    docker exec -it clihospital bash -c "peer channel join -b allowancechannel.block"
    docker exec -it cliinsurance bash -c "peer channel join -b allowancechannel.block"

    #   步驟四 更新錨節點
    echo "更新錨節點"
    configtxgen -outputAnchorPeersUpdate ./system-genesis-block/bank_anchor_peer.tx -profile Channel -asOrg OrgbankMSP -channelID allowancechannel
    configtxgen -outputAnchorPeersUpdate ./system-genesis-block/breeder_anchor_peer.tx -profile Channel -asOrg OrgbreederMSP -channelID allowancechannel
    configtxgen -outputAnchorPeersUpdate ./system-genesis-block/government_anchor_peer.tx -profile Channel -asOrg OrggovernmentMSP -channelID allowancechannel
    configtxgen -outputAnchorPeersUpdate ./system-genesis-block/hospital_anchor_peer.tx -profile Channel -asOrg OrghospitalMSP -channelID allowancechannel
    configtxgen -outputAnchorPeersUpdate ./system-genesis-block/insurance_anchor_peer.tx -profile Channel -asOrg OrginsuranceMSP -channelID allowancechannel
    configtxgen -outputAnchorPeersUpdate ./system-genesis-block/pthospital_anchor_peer.tx -profile Channel -asOrg OrgpthospitalMSP -channelID allowancechannel

    echo "開始創建病歷通道....."

    echo "输出创建通道的交易 配置應用通道"
    configtxgen -outputCreateChannelTx ./system-genesis-block/recordchannel.tx -profile recordChannel -channelID recordchannel

    echo "在cli hospital 創建 recordchannel 通道 用來操作病歷"
    docker exec clihospital bash -c "peer channel create -c recordchannel --orderer orderer.anrail.com:7050 -f ./system-genesis-block/recordchannel.tx --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem"

    echo "将clihospital 创建的recordchannel.block 分发给需要加入此通道的容器"
    docker cp clihospital:/opt/gopath/src/github.com/hyperledger/fabric/peer/recordchannel.block ./system-genesis-block
    docker cp  ./system-genesis-block/recordchannel.block  clipthospital:/opt/gopath/src/github.com/hyperledger/fabric/peer/recordchannel.block

    echo "等待5秒"
    sleep 5 

    echo "把節點加入 recordchannel 通道 用來操作病歷"
    docker exec -it clihospital bash -c "peer channel join -b recordchannel.block"
    docker exec -it clipthospital bash -c "peer channel join -b recordchannel.block"
    
    echo "更新錨節點"
    configtxgen -outputAnchorPeersUpdate ./system-genesis-block/hospital_anchor_peer.tx -profile recordChannel -asOrg OrghospitalMSP -channelID recordchannel
    configtxgen -outputAnchorPeersUpdate ./system-genesis-block/pthospital_anchor_peer.tx -profile recordChannel -asOrg OrgpthospitalMSP -channelID recordchannel
}


#   執行 function
networkUp

createChannel





# echo "使用 cryptogen 生成證書和密鑰..."
# echo "生成bank org"
# cryptogen generate --config=./organizations/crypto-config/bank-org.yaml --output="organizations"
# echo "生成breeder org"
# cryptogen generate --config=./organizations/crypto-config/breeder-org.yaml --output="organizations"
# echo "生成government org"
# cryptogen generate --config=./organizations/crypto-config/government-org.yaml --output="organizations"
# echo "生成hospital org"
# cryptogen generate --config=./organizations/crypto-config/hospital-org.yaml --output="organizations"
# echo "生成insurance org"
# cryptogen generate --config=./organizations/crypto-config/insurance-org.yaml --output="organizations"
# echo "生成 orderer 身份"
# cryptogen generate --config=./organizations/crypto-config/orderer.yaml --output="organizations"
# echo "生成 屏東動物醫院 身份"
# cryptogen generate --config=./organizations/crypto-config/pthospital-org.yaml --output="organizations"










