## AnRail  區塊鏈寵物醫療紀錄系統
為飼主提供透明且安全的雲端寵物病歷App


####    環境要求： 

* Hyperledger fabric 2.2 LTS

* Ubuntu 22.04

* Docker & Docker-compose

* Node.js

#### Usage：
* 部屬網路 

    `cd network/`   進入 network 資料夾 <br>

    `./startFabric.sh`  執行部屬腳本 <br>

    `./network.sh down` 停止fabric網路 <br>

* 啟動伺服器 

    `cd server/`   進入 server 資料夾 <br>

    `npx nodemon index.ts` 啟動伺服器 <br>

* 註冊管理員

    `cd server/`   進入 server 資料夾 <br>

    `ts-node enrollAdmin.ts` 註冊管理員-醫療身份 <br>

