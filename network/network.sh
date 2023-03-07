#!/bin/bash


export PATH=${PWD}/../bin:$PATH # 設定 fabric 二進位工具的位址
export FABRIC_CFG_PATH=${PWD}/configtx # 設定 configtx.yaml 的位址
export VERBOSE=false # 將詳細模式設定為 false

# 載入命令行設定及幫助文件
. scripts/utils.sh



# 使用 fabric CA 工具 創建組織證書密鑰 
function createOrgs() {

    # 使用 Fabric CA 生成
    infoln "使用 fabric ca 生成證書和密鑰..."
    infoln "---docker-compose-ca 啟動 ca server 服務---"
    docker-compose -f docker/docker-compose-ca.yaml up -d
    . organizations/fabric-ca/enroll.sh #執行ca 註冊

    while :
      do
          if [ ! -f "organizations/fabric-ca/bank/tls-cert.pem" ]; then
              sleep 2
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
    sleep 5
    ./organizations/ccp-generate.sh

}


# 依照組織配置 生成創世區塊
function createConsortium() {
  which configtxgen
  if [ "$?" -ne 0 ]; then
    fatalln "configtxgen tool not found."
  fi

  infoln "為排序通道 使用 configtxgen 生成創世區塊..."


  set -x
  configtxgen -profile Genesis -channelID system-channel -outputBlock ./system-genesis-block/genesis.block
  
  res=$?
  { set +x; } 2>/dev/null
  if [ $res -ne 0 ]; then
    fatalln "創建創世區塊失敗！"
  fi
}


# 啟動網路
function networkUp() {

  createOrgs
  createConsortium

  infoln "啟用 docker 服務 組織及 couch db"
  docker-compose -f docker/docker-compose-net.yaml -f docker/docker-compose-couch.yaml up -d

  docker ps -a
  if [ $? -ne 0 ]; then
    fatalln "啟動網路失敗！"
  fi
}


#  創建通道
function createChannel() {
  

  
  scripts/createChannel.sh $CHANNEL_NAME $CLI_DELAY $MAX_RETRY $VERBOSE
}


#  安裝及部署鏈碼
function deployCC() {
  scripts/deployCC.sh $CHANNEL_NAME $CC_NAME $CC_SRC_PATH $CC_SRC_LANGUAGE $CC_VERSION $CC_SEQUENCE $CC_INIT_FCN $CC_END_POLICY $CC_COLL_CONFIG $CLI_DELAY $MAX_RETRY $VERBOSE

  if [ $? -ne 0 ]; then
    fatalln "Deploying chaincode failed"
  fi
}


# 用 docker ps 獲取 container ID 刪除
# 清理 docker containers netowrk down 時被呼叫
function clearContainers() {
  CONTAINER_IDS=$(docker ps -a | awk '($2 ~ /dev-peer.*/) {print $1}')
  if [ -z "$CONTAINER_IDS" -o "$CONTAINER_IDS" == " " ]; then
    echo "No containers available for deletion"
  else
    docker rm -f $CONTAINER_IDS
  fi
}

# 刪除生成的 docker images network down 時被呼叫
# 具体而言，以下images通常会被留下
function removeUnwantedImages() {
  DOCKER_IMAGE_IDS=$(docker images | awk '($1 ~ /dev-peer.*/) {print $3}')
  if [ -z "$DOCKER_IMAGE_IDS" -o "$DOCKER_IMAGE_IDS" == " " ]; then
    echo "No images available for deletion"
  else
    docker rmi -f $DOCKER_IMAGE_IDS
  fi
}



# Tear down running network
function networkDown() {
  # 清理錢包資料夾中舊的身份資料
  rm -rf ../application/server/wallet/*
  
  docker-compose -f docker/docker-compose-net.yaml -f docker/docker-compose-couch.yaml -f docker/docker-compose-ca.yaml down --volumes --remove-orphans
  
  # Don't remove the generated artifacts -- note, the ledgers are always removed
  if [ "$MODE" != "restart" ]; then
    # Bring down the network, deleting the volumes
    #Cleanup the chaincode containers
    clearContainers
    #Cleanup images
    removeUnwantedImages
    # remove orderer block and other channel configuration transactions and certs
    docker run --rm -v $(pwd):/data busybox sh -c 'cd /data && rm -rf system-genesis-block/*.block organizations/peerOrganizations organizations/ordererOrganizations'
    ## remove fabric ca artifacts
    docker run --rm -v $(pwd):/data busybox sh -c 'cd /data && rm -rf organizations/fabric-ca/bank/msp organizations/fabric-ca/bank/tls-cert.pem organizations/fabric-ca/bank/ca-cert.pem organizations/fabric-ca/bank/IssuerPublicKey organizations/fabric-ca/bank/IssuerRevocationPublicKey organizations/fabric-ca/bank/fabric-ca-server.db'
    docker run --rm -v $(pwd):/data busybox sh -c 'cd /data && rm -rf organizations/fabric-ca/breeder/msp organizations/fabric-ca/breeder/tls-cert.pem organizations/fabric-ca/breeder/ca-cert.pem organizations/fabric-ca/breeder/IssuerPublicKey organizations/fabric-ca/breeder/IssuerRevocationPublicKey organizations/fabric-ca/breeder/fabric-ca-server.db'
    docker run --rm -v $(pwd):/data busybox sh -c 'cd /data && rm -rf organizations/fabric-ca/ordererOrg/msp organizations/fabric-ca/ordererOrg/tls-cert.pem organizations/fabric-ca/ordererOrg/ca-cert.pem organizations/fabric-ca/ordererOrg/IssuerPublicKey organizations/fabric-ca/ordererOrg/IssuerRevocationPublicKey organizations/fabric-ca/ordererOrg/fabric-ca-server.db'
    docker run --rm -v $(pwd):/data busybox sh -c 'cd /data && rm -rf organizations/fabric-ca/government/msp organizations/fabric-ca/government/tls-cert.pem organizations/fabric-ca/government/ca-cert.pem organizations/fabric-ca/government/IssuerPublicKey organizations/fabric-ca/government/IssuerRevocationPublicKey organizations/fabric-ca/government/fabric-ca-server.db'
    docker run --rm -v $(pwd):/data busybox sh -c 'cd /data && rm -rf organizations/fabric-ca/hospital/msp organizations/fabric-ca/hospital/tls-cert.pem organizations/fabric-ca/hospital/ca-cert.pem organizations/fabric-ca/hospital/IssuerPublicKey organizations/fabric-ca/hospital/IssuerRevocationPublicKey organizations/fabric-ca/hospital/fabric-ca-server.db'
    docker run --rm -v $(pwd):/data busybox sh -c 'cd /data && rm -rf organizations/fabric-ca/insurance/msp organizations/fabric-ca/insurance/tls-cert.pem organizations/fabric-ca/insurance/ca-cert.pem organizations/fabric-ca/insurance/IssuerPublicKey organizations/fabric-ca/insurance/IssuerRevocationPublicKey organizations/fabric-ca/insurance/fabric-ca-server.db'
    docker run --rm -v $(pwd):/data busybox sh -c 'cd /data && rm -rf organizations/fabric-ca/pthospital/msp organizations/fabric-ca/pthospital/tls-cert.pem organizations/fabric-ca/pthospital/ca-cert.pem organizations/fabric-ca/pthospital/IssuerPublicKey organizations/fabric-ca/pthospital/IssuerRevocationPublicKey organizations/fabric-ca/pthospital/fabric-ca-server.db'

    
    # remove channel and script artifacts
    docker run --rm -v $(pwd):/data busybox sh -c 'cd /data && rm -rf channel-artifacts log.txt *.tar.gz'
  fi
}



MAX_RETRY=5
# default for delay between commands
CLI_DELAY=3
# channel name defaults to "mychannel"
CHANNEL_NAME="railchannel"
# chaincode name defaults to "NA"
CC_NAME="NA"
# chaincode path defaults to "NA"
CC_SRC_PATH="NA"
# endorsement policy defaults to "NA". This would allow chaincodes to use the majority default policy.
CC_END_POLICY="NA"
# collection configuration defaults to "NA"
CC_COLL_CONFIG="NA"
# chaincode init function defaults to "NA"
CC_INIT_FCN="NA"

# chaincode language defaults to "NA"
CC_SRC_LANGUAGE="NA"
# Chaincode version
CC_VERSION="1.0"
# Chaincode definition sequence
CC_SEQUENCE=1

# Parse commandline args

## Parse mode
if [[ $# -lt 1 ]] ; then
  printHelp
  exit 0
else
  MODE=$1
  shift
fi

# parse a createChannel subcommand if used
if [[ $# -ge 1 ]] ; then
  key="$1"
  if [[ "$key" == "createChannel" ]]; then
      export MODE="createChannel"
      shift
  fi
fi

# parse flags

while [[ $# -ge 1 ]] ; do
  key="$1"
  case $key in
  -h )
    printHelp $MODE
    exit 0
    ;;
  -c )
    CHANNEL_NAME="$2"
    shift
    ;;
  -ca )
    CRYPTO="Certificate Authorities"
    ;;
  -r )
    MAX_RETRY="$2"
    shift
    ;;
  -d )
    CLI_DELAY="$2"
    shift
    ;;
  -s )
    DATABASE="$2"
    shift
    ;;
  -ccl )
    CC_SRC_LANGUAGE="$2"
    shift
    ;;
  -ccn )
    CC_NAME="$2"
    shift
    ;;
  -ccv )
    CC_VERSION="$2"
    shift
    ;;
  -ccs )
    CC_SEQUENCE="$2"
    shift
    ;;
  -ccp )
    CC_SRC_PATH="$2"
    shift
    ;;
  -ccep )
    CC_END_POLICY="$2"
    shift
    ;;
  -cccg )
    CC_COLL_CONFIG="$2"
    shift
    ;;
  -cci )
    CC_INIT_FCN="$2"
    shift
    ;;
  -i )
    IMAGETAG="$2"
    shift
    ;;
  -cai )
    CA_IMAGETAG="$2"
    shift
    ;;
  -verbose )
    VERBOSE=true
    shift
    ;;
  * )
    errorln "Unknown flag: $key"
    printHelp
    exit 1
    ;;
  esac
  shift
done

# Are we generating crypto material with this command?
if [ ! -d "organizations/peerOrganizations" ]; then
  CRYPTO_MODE="with crypto from '${CRYPTO}'"
else
  CRYPTO_MODE=""
fi

# Determine mode of operation and printing out what we asked for
if [ "$MODE" == "up" ]; then
  infoln "Starting nodes with CLI timeout of '${MAX_RETRY}' tries and CLI delay of '${CLI_DELAY}' seconds and using database '${DATABASE}' ${CRYPTO_MODE}"
elif [ "$MODE" == "createChannel" ]; then
  infoln "Creating channel '${CHANNEL_NAME}'."
  infoln "If network is not up, starting nodes with CLI timeout of '${MAX_RETRY}' tries and CLI delay of '${CLI_DELAY}' seconds and using database '${DATABASE} ${CRYPTO_MODE}"
elif [ "$MODE" == "down" ]; then
  infoln "Stopping network"
elif [ "$MODE" == "restart" ]; then
  infoln "Restarting network"
elif [ "$MODE" == "deployCC" ]; then
  infoln "deploying chaincode on channel '${CHANNEL_NAME}'"
else
  printHelp
  exit 1
fi

if [ "${MODE}" == "up" ]; then
  networkUp
elif [ "${MODE}" == "createChannel" ]; then
  createChannel
elif [ "${MODE}" == "deployCC" ]; then
  deployCC
elif [ "${MODE}" == "down" ]; then
  networkDown
else
  printHelp
  exit 1
fi
