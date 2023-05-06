#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

#銀行組織配置
ORG=bank
P0PORT=7051
CAPORT=7054
PEERPEM=organizations/peerOrganizations/bank.anrail.com/tlsca/tlsca.bank.anrail.com-cert.pem
CAPEM=organizations/peerOrganizations/bank.anrail.com/ca/ca.bank.anrail.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/bank.anrail.com/connection-bank.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/bank.anrail.com/connection-bank.yaml

#飼主組織配置
ORG=breeder
P0PORT=9051
CAPORT=8054
PEERPEM=organizations/peerOrganizations/breeder.anrail.com/tlsca/tlsca.breeder.anrail.com-cert.pem
CAPEM=organizations/peerOrganizations/breeder.anrail.com/ca/ca.breeder.anrail.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/breeder.anrail.com/connection-breeder.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/breeder.anrail.com/connection-breeder.yaml

#政府組織配置
ORG=government
P0PORT=8051
CAPORT=6054
PEERPEM=organizations/peerOrganizations/government.anrail.com/tlsca/tlsca.government.anrail.com-cert.pem
CAPEM=organizations/peerOrganizations/government.anrail.com/ca/ca.government.anrail.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/government.anrail.com/connection-government.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/government.anrail.com/connection-government.yaml

#醫院組織配置
ORG=hospital
P0PORT=6051
CAPORT=4054
PEERPEM=organizations/peerOrganizations/hospital.anrail.com/tlsca/tlsca.hospital.anrail.com-cert.pem
CAPEM=organizations/peerOrganizations/hospital.anrail.com/ca/ca.hospital.anrail.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hospital.anrail.com/connection-hospital.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hospital.anrail.com/connection-hospital.yaml

#保險組織配置
ORG=insurance
P0PORT=5051
CAPORT=3054
PEERPEM=organizations/peerOrganizations/insurance.anrail.com/tlsca/tlsca.insurance.anrail.com-cert.pem
CAPEM=organizations/peerOrganizations/insurance.anrail.com/ca/ca.insurance.anrail.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/insurance.anrail.com/connection-insurance.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/insurance.anrail.com/connection-insurance.yaml

#屏東動物醫院組織配置
ORG=pthospital
P0PORT=6070
CAPORT=2054
PEERPEM=organizations/peerOrganizations/pthospital.anrail.com/tlsca/tlsca.pthospital.anrail.com-cert.pem
CAPEM=organizations/peerOrganizations/pthospital.anrail.com/ca/ca.pthospital.anrail.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/pthospital.anrail.com/connection-pthospital.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/pthospital.anrail.com/connection-pthospital.yaml
