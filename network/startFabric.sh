#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error

#   shell set 指令 執行模式遇到 error 立即退出
set -e


export MSYS_NO_PATHCONV=1
starttime=$(date +%s)

# chaincode 鏈碼的位址
CC_SRC_PATH="../chaincode/"


# 清理錢包資料夾中舊的身份資料
rm -rf ../application/server/wallet/*


# 啟動網路部屬
./network.sh down 
./network.sh up
./network.sh createChannel
./network.sh deployCC -ccn petcontract -ccv 1 -cci initLedger -ccl typescript -ccp ${CC_SRC_PATH}



