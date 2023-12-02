docker rm -f my-app-frontend
docker pull registry.cn-hangzhou.aliyuncs.com/cloudyhub/my-app-frontend:vtest
docker run --name=my-app-frontend -dp 6002:80 registry.cn-hangzhou.aliyuncs.com/cloudyhub/my-app-frontend:vtest