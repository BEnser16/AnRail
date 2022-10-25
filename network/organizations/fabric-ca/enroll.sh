#!/bin/bash

# 生成銀行組織
function createOrgbank() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/bank.anrail.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/bank.anrail.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca-bank --tls.certfiles ${PWD}/organizations/fabric-ca/bank/tls-cert.pem
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-bank.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-bank.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-bank.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-bank.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/peerOrganizations/bank.anrail.com/msp/config.yaml

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-bank --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/bank/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-bank --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/bank/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-bank --id.name bankadmin --id.secret bankadminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/bank/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-bank -M ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/msp --csr.hosts peer0.bank.anrail.com --tls.certfiles ${PWD}/organizations/fabric-ca/bank/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/bank.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-bank -M ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls --enrollment.profile tls --csr.hosts peer0.bank.anrail.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/bank/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/bank.anrail.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/bank.anrail.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/bank.anrail.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/bank.anrail.com/tlsca/tlsca.bank.anrail.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/bank.anrail.com/ca
  cp ${PWD}/organizations/peerOrganizations/bank.anrail.com/peers/peer0.bank.anrail.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/bank.anrail.com/ca/ca.bank.anrail.com-cert.pem

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-bank -M ${PWD}/organizations/peerOrganizations/bank.anrail.com/users/User1@bank.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/bank/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/bank.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/bank.anrail.com/users/User1@bank.anrail.com/msp/config.yaml

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://bankadmin:bankadminpw@localhost:7054 --caname ca-bank -M ${PWD}/organizations/peerOrganizations/bank.anrail.com/users/Admin@bank.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/bank/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/bank.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/bank.anrail.com/users/Admin@bank.anrail.com/msp/config.yaml
}

function createOrgbreeder() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/breeder.anrail.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/breeder.anrail.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:8054 --caname ca-breeder --tls.certfiles ${PWD}/organizations/fabric-ca/breeder/tls-cert.pem
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-breeder.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-breeder.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-breeder.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-breeder.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/peerOrganizations/breeder.anrail.com/msp/config.yaml

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-breeder --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/breeder/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-breeder --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/breeder/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-breeder --id.name breederadmin --id.secret breederadminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/breeder/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-breeder -M ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/msp --csr.hosts peer0.breeder.anrail.com --tls.certfiles ${PWD}/organizations/fabric-ca/breeder/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/breeder.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-breeder -M ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls --enrollment.profile tls --csr.hosts peer0.breeder.anrail.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/breeder/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/breeder.anrail.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/breeder.anrail.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/breeder.anrail.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/breeder.anrail.com/tlsca/tlsca.breeder.anrail.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/breeder.anrail.com/ca
  cp ${PWD}/organizations/peerOrganizations/breeder.anrail.com/peers/peer0.breeder.anrail.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/breeder.anrail.com/ca/ca.breeder.anrail.com-cert.pem

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:8054 --caname ca-breeder -M ${PWD}/organizations/peerOrganizations/breeder.anrail.com/users/User1@breeder.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/breeder/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/breeder.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/breeder.anrail.com/users/User1@breeder.anrail.com/msp/config.yaml

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://breederadmin:breederadminpw@localhost:8054 --caname ca-breeder -M ${PWD}/organizations/peerOrganizations/breeder.anrail.com/users/Admin@breeder.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/breeder/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/breeder.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/breeder.anrail.com/users/Admin@breeder.anrail.com/msp/config.yaml
}

function createOrggovernment() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/government.anrail.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/government.anrail.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:6054 --caname ca-government --tls.certfiles ${PWD}/organizations/fabric-ca/government/tls-cert.pem
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-6054-ca-government.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-6054-ca-government.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-6054-ca-government.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-6054-ca-government.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/peerOrganizations/government.anrail.com/msp/config.yaml

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-government --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/government/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-government --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/government/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-government --id.name governmentadmin --id.secret governmentadminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/government/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:6054 --caname ca-government -M ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/msp --csr.hosts peer0.government.anrail.com --tls.certfiles ${PWD}/organizations/fabric-ca/government/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/government.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:6054 --caname ca-government -M ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls --enrollment.profile tls --csr.hosts peer0.government.anrail.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/government/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/government.anrail.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/government.anrail.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/government.anrail.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/government.anrail.com/tlsca/tlsca.government.anrail.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/government.anrail.com/ca
  cp ${PWD}/organizations/peerOrganizations/government.anrail.com/peers/peer0.government.anrail.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/government.anrail.com/ca/ca.government.anrail.com-cert.pem

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:6054 --caname ca-government -M ${PWD}/organizations/peerOrganizations/government.anrail.com/users/User1@government.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/government/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/government.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/government.anrail.com/users/User1@government.anrail.com/msp/config.yaml

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://governmentadmin:governmentadminpw@localhost:6054 --caname ca-government -M ${PWD}/organizations/peerOrganizations/government.anrail.com/users/Admin@government.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/government/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/government.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/government.anrail.com/users/Admin@government.anrail.com/msp/config.yaml
}

function createOrghospital() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/hospital.anrail.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/hospital.anrail.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:4054 --caname ca-hospital --tls.certfiles ${PWD}/organizations/fabric-ca/hospital/tls-cert.pem
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-4054-ca-hospital.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-4054-ca-hospital.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-4054-ca-hospital.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-4054-ca-hospital.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/peerOrganizations/hospital.anrail.com/msp/config.yaml

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-hospital --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/hospital/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-hospital --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/hospital/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-hospital --id.name hospitaladmin --id.secret hospitaladminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/hospital/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4054 --caname ca-hospital -M ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/msp --csr.hosts peer0.hospital.anrail.com --tls.certfiles ${PWD}/organizations/fabric-ca/hospital/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/hospital.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4054 --caname ca-hospital -M ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls --enrollment.profile tls --csr.hosts peer0.hospital.anrail.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/hospital/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/hospital.anrail.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/hospital.anrail.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/hospital.anrail.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/hospital.anrail.com/tlsca/tlsca.hospital.anrail.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/hospital.anrail.com/ca
  cp ${PWD}/organizations/peerOrganizations/hospital.anrail.com/peers/peer0.hospital.anrail.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/hospital.anrail.com/ca/ca.hospital.anrail.com-cert.pem

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:4054 --caname ca-hospital -M ${PWD}/organizations/peerOrganizations/hospital.anrail.com/users/User1@hospital.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/hospital/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/hospital.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/hospital.anrail.com/users/User1@hospital.anrail.com/msp/config.yaml

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://hospitaladmin:hospitaladminpw@localhost:4054 --caname ca-hospital -M ${PWD}/organizations/peerOrganizations/hospital.anrail.com/users/Admin@hospital.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/hospital/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/hospital.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/hospital.anrail.com/users/Admin@hospital.anrail.com/msp/config.yaml
}

function createOrginsurance() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/insurance.anrail.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/insurance.anrail.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:3054 --caname ca-insurance --tls.certfiles ${PWD}/organizations/fabric-ca/insurance/tls-cert.pem
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-3054-ca-insurance.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-3054-ca-insurance.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-3054-ca-insurance.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-3054-ca-insurance.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/peerOrganizations/insurance.anrail.com/msp/config.yaml

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-insurance --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/insurance/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-insurance --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/insurance/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-insurance --id.name insuranceadmin --id.secret insuranceadminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/insurance/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:3054 --caname ca-insurance -M ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/msp --csr.hosts peer0.insurance.anrail.com --tls.certfiles ${PWD}/organizations/fabric-ca/insurance/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/insurance.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:3054 --caname ca-insurance -M ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls --enrollment.profile tls --csr.hosts peer0.insurance.anrail.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/insurance/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/insurance.anrail.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/insurance.anrail.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/insurance.anrail.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/insurance.anrail.com/tlsca/tlsca.insurance.anrail.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/insurance.anrail.com/ca
  cp ${PWD}/organizations/peerOrganizations/insurance.anrail.com/peers/peer0.insurance.anrail.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/insurance.anrail.com/ca/ca.insurance.anrail.com-cert.pem

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:3054 --caname ca-insurance -M ${PWD}/organizations/peerOrganizations/insurance.anrail.com/users/User1@insurance.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/insurance/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/insurance.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/insurance.anrail.com/users/User1@insurance.anrail.com/msp/config.yaml

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://insuranceadmin:insuranceadminpw@localhost:3054 --caname ca-insurance -M ${PWD}/organizations/peerOrganizations/insurance.anrail.com/users/Admin@insurance.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/insurance/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/insurance.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/insurance.anrail.com/users/Admin@insurance.anrail.com/msp/config.yaml
}

function createOrgpthospital() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/pthospital.anrail.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/pthospital.anrail.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:2054 --caname ca-pthospital --tls.certfiles ${PWD}/organizations/fabric-ca/pthospital/tls-cert.pem
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-2054-ca-pthospital.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-2054-ca-pthospital.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-2054-ca-pthospital.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-2054-ca-pthospital.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/peerOrganizations/pthospital.anrail.com/msp/config.yaml

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-pthospital --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/pthospital/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-pthospital --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/pthospital/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-pthospital --id.name pthospitaladmin --id.secret pthospitaladminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/pthospital/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:2054 --caname ca-pthospital -M ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/msp --csr.hosts peer0.pthospital.anrail.com --tls.certfiles ${PWD}/organizations/fabric-ca/pthospital/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:2054 --caname ca-pthospital -M ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls --enrollment.profile tls --csr.hosts peer0.pthospital.anrail.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/pthospital/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/tlsca/tlsca.pthospital.anrail.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/ca
  cp ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/peers/peer0.pthospital.anrail.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/ca/ca.pthospital.anrail.com-cert.pem

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:2054 --caname ca-pthospital -M ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/users/User1@pthospital.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/pthospital/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/users/User1@pthospital.anrail.com/msp/config.yaml

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://pthospitaladmin:pthospitaladminpw@localhost:2054 --caname ca-pthospital -M ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/users/Admin@pthospital.anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/pthospital/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/pthospital.anrail.com/users/Admin@pthospital.anrail.com/msp/config.yaml
}

function createOrderer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/anrail.com

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/anrail.com

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/ordererOrganizations/anrail.com/msp/config.yaml

  infoln "Registering orderer"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering the orderer admin"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Generating the orderer msp"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp --csr.hosts orderer.anrail.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/ordererOrganizations/anrail.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/config.yaml

  infoln "Generating the orderer-tls certificates"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/tls --enrollment.profile tls --csr.hosts orderer.anrail.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/tls/ca.crt
  cp ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/tls/signcerts/* ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/tls/server.crt
  cp ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/tls/keystore/* ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/tls/server.key

  mkdir -p ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem

  mkdir -p ${PWD}/organizations/ordererOrganizations/anrail.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/anrail.com/orderers/orderer.anrail.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/anrail.com/msp/tlscacerts/tlsca.anrail.com-cert.pem

  infoln "Generating the admin msp"
  set -x
  fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/anrail.com/users/Admin@anrail.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/ordererOrganizations/anrail.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/anrail.com/users/Admin@anrail.com/msp/config.yaml
}
