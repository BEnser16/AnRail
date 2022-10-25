#!/bin/bash

echo "進入節點容器"
echo "在hospital pthospital 兩個節點 打包鏈碼"
docker exec -it clipthospital bash -c "peer lifecycle chaincode package petinfo.tar.gz --path /opt/gopath/src/github.com/hyperledger/fabric/fabric-cluster/chaincode/record --lang node --label petinfo"
docker exec -it clihospital bash -c "peer lifecycle chaincode package petinfo.tar.gz --path /opt/gopath/src/github.com/hyperledger/fabric/fabric-cluster/chaincode/record --lang node --label petinfo"

echo "等待3秒"
sleep 3

echo "pthospital hospital 節點 安裝鏈碼"

docker exec -it clipthospital bash -c "peer lifecycle chaincode install petinfo.tar.gz"
docker exec -it clihospital bash -c "peer lifecycle chaincode install petinfo.tar.gz"

echo "等待3秒"
sleep 3


echo "取得 pakage ID"
docker exec -it clihospital bash -c "peer lifecycle chaincode queryinstalled" >&log.txt
cat log.txt
PACKAGE_ID=$(sed -n "/petinfo/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
echo "print ID"
echo $PACKAGE_ID


echo "hospital 跟 pthospital 兩個組織核准鏈碼"
echo "hospital 開始核准"
docker exec -it clihospital bash -c "peer lifecycle chaincode approveformyorg --channelID recordchannel --name petinfo --version 1.0 --init-required --package-id ${PACKAGE_ID} --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem"
#--signature-policy \"OR ('HospitalMSP.member','PTHospitalMSP.member')\"

echo "等待10秒"
sleep 10

echo "確認批准"
docker exec -it clihospital bash -c "peer lifecycle chaincode checkcommitreadiness --channelID recordchannel --name petinfo --version 1.0 --sequence 1 --init-required --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem --output json"

echo "pthospital 開始核准"
docker exec -it clipthospital bash -c "peer lifecycle chaincode approveformyorg --channelID recordchannel --name petinfo --version 1.0 --init-required --package-id ${PACKAGE_ID} --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem"

echo "確認批准"
docker exec -it clihospital bash -c "peer lifecycle chaincode checkcommitreadiness --channelID recordchannel --name petinfo --version 1.0 --sequence 1 --init-required --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem --output json"

echo "等待10秒"
sleep 10

echo "從clihospital 提交鏈碼"
docker exec -it clihospital bash -c "peer lifecycle chaincode commit -o orderer.anrail.com:7050 --channelID recordchannel --name petinfo --version 1.0 --init-required  --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem \
--peerAddresses peer0.hospital.anrail.com:6051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/ca.crt \
--peerAddresses peer0.pthospital.anrail.com:6070 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/ca.crt "


echo "測試鏈碼 調用initLedger function"
docker exec -it clihospital bash -c "peer chaincode invoke -o orderer.anrail.com:7050 -C recordchannel -n petinfo --isInit --ordererTLSHostnameOverride orderer.anrail.com --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem \
--peerAddresses peer0.hospital.anrail.com:6051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/ca.crt \
--peerAddresses peer0.pthospital.anrail.com:6070 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/ca.crt \
-c '{\"Args\":[\"initLedger\"]}'"



