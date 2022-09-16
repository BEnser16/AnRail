#!/bin/bash

echo "停止docker-compose"
docker-compose down

echo "清理環境"
mkdir -p channel-artifacts
mkdir -p crypto-config
sudo rm -rf channel-artifacts/*
rm -rf crypto-config/*
rmdir crypto-config
rmdir channel-artifacts
echo "清理完成！"