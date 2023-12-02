docker rm -f studio-demo-frontend
docker pull registry.cn-hangzhou.aliyuncs.com/cloudyhub/studio-demo-frontend:vtest
docker run --name=studio-demo-frontend -dp 6002:80 registry.cn-hangzhou.aliyuncs.com/cloudyhub/studio-demo-frontend:vtest