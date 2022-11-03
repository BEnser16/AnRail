#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)

CC_SRC_PATH="../chaincode/record/"


# clean out any old identites in the wallets
rm -rf ../application/server/lib/wallet/*


# launch network; create channel and join peer to channel

./network.sh down
./network.sh up
./network.sh createChannel
./network.sh deployCC -ccn petinfo -ccv 1 -cci initLedger -ccl javascript -ccp ${CC_SRC_PATH}



