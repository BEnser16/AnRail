#!/bin/bash

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


echo "清理环境"
clearContainers
removeUnwantedImages
docker-compose -f docker/docker-compose-net.yaml -f docker/docker-compose-couch.yaml down --volumes --remove-orphans
docker-compose -f docker/docker-compose-ca.yaml down --volumes --remove-orphans

mkdir -p organizations/ordererOrganizations
mkdir -p organizations/peerOrganizations
mkdir -p system-genesis-block
sudo rm -rf organizations/ordererOrganizations/*
sudo rm -rf organizations/peerOrganizations/*
sudo rm -rf organizations/fabric-ca/bank/*
sudo rm -rf organizations/fabric-ca/breeder/*
sudo rm -rf organizations/fabric-ca/government/*
sudo rm -rf organizations/fabric-ca/hospital/*
sudo rm -rf organizations/fabric-ca/insurance/*
sudo rm -rf organizations/fabric-ca/ordererOrg/*
sudo rm -rf organizations/fabric-ca/pthospital/*
rm -rf system-genesis-block/*

echo "清理完毕"
