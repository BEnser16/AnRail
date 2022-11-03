#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

# imports
. scripts/utils.sh

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem
export PEER0_bank_CA=${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls/ca.crt
export PEER0_breeder_CA=${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls/ca.crt
export PEER0_government_CA=${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls/ca.crt
export PEER0_hospital_CA=${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/ca.crt
export PEER0_insurance_CA=${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls/ca.crt
export PEER0_pthospital_CA=${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/ca.crt

# Set environment variables for the peer org
setGlobals() {
  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG="$1"
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  infoln "Using organization ${USING_ORG}"
  if [ $USING_ORG == "bank" ]; then
    export CORE_PEER_LOCALMSPID="OrgbankMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_bank_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/bank.anrail.com/users/Admin@bank.anrail.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
  elif [ $USING_ORG == "breeder" ]; then
    export CORE_PEER_LOCALMSPID="OrgbreederMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_breeder_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/breeder.anrail.com/users/Admin@breeder.anrail.com/msp
    export CORE_PEER_ADDRESS=localhost:9051

  elif [ $USING_ORG == "government" ]; then
    export CORE_PEER_LOCALMSPID="OrggovernmentMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_government_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/government.anrail.com/users/Admin@government.anrail.com/msp
    export CORE_PEER_ADDRESS=localhost:8051

  elif [ "$USING_ORG" == "hospital" ]; then
    export CORE_PEER_LOCALMSPID="OrghospitalMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_hospital_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/hospital.anrail.com/users/Admin@hospital.anrail.com/msp
    export CORE_PEER_ADDRESS=localhost:6051

  elif [ $USING_ORG == "insurance" ]; then
    export CORE_PEER_LOCALMSPID="OrginsuranceMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_insurance_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/insurance.anrail.com/users/Admin@insurance.anrail.com/msp
    export CORE_PEER_ADDRESS=localhost:5051

  elif [ $USING_ORG == "pthospital" ]; then
    export CORE_PEER_LOCALMSPID="OrgpthospitalMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_pthospital_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/pthospital.anrail.com/users/Admin@pthospital.anrail.com/msp
    export CORE_PEER_ADDRESS=localhost:6070

  else
    errorln "ORG Unknown"
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

# Set environment variables for use in the CLI container 
setGlobalsCLI() {
  setGlobals $1

  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  if [ $USING_ORG == "bank" ]; then
    export CORE_PEER_ADDRESS=peer0.bank.anrail.com:7051
  elif [ $USING_ORG == "breeder" ]; then
    export CORE_PEER_ADDRESS=peer0.breeder.anrail.com:9051
  elif [ $USING_ORG == "government" ]; then
    export CORE_PEER_ADDRESS=peer0.government.anrail.com:8051
  elif [ $USING_ORG == "hospital" ]; then
    export CORE_PEER_ADDRESS=peer0.hospital.anrail.com:6051
  elif [ $USING_ORG == "insurance" ]; then
    export CORE_PEER_ADDRESS=peer0.insurance.anrail.com:5051
  elif [ $USING_ORG == "pthospital" ]; then
    export CORE_PEER_ADDRESS=peer0.pthospital.anrail.com:6070
  else
    errorln "ORG Unknown"
  fi
}

# parsePeerConnectionParameters $@
# Helper function that sets the peer connection parameters for a chaincode
# operation
parsePeerConnectionParameters() {
  PEER_CONN_PARMS=""
  PEERS=""
  while [ "$#" -gt 0 ]; do
    setGlobals $1
    PEER="peer0.org$1"
    ## Set peer addresses
    PEERS="$PEERS $PEER"
    PEER_CONN_PARMS="$PEER_CONN_PARMS --peerAddresses $CORE_PEER_ADDRESS"
    ## Set path to TLS certificate
    TLSINFO=$(eval echo "--tlsRootCertFiles \$PEER0_$1_CA")
    PEER_CONN_PARMS="$PEER_CONN_PARMS $TLSINFO"
    # shift by one to get to the next organization
    shift
  done
  # remove leading space for output
  PEERS="$(echo -e "$PEERS" | sed -e 's/^[[:space:]]*//')"
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}
