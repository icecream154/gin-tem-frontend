docker rm -f askomo-frontend
docker pull registry.cn-hangzhou.aliyuncs.com/cloudyhub/askomo-frontend:vtest
docker run --name=askomo-frontend -dp 6002:80 registry.cn-hangzhou.aliyuncs.com/cloudyhub/askomo-frontend:vtest