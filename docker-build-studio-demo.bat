@echo off

npm run build

docker buildx build --platform linux/amd64 --tag cloudyhub:studio-demo-frontend -f Dockerfile .

docker run --name=studio-demo-frontend -dp 3000:3000 cloudyhub:studio-demo-frontend --add-host=host.docker.internal:host-gateway

docker tag cloudyhub:studio-demo-frontend registry.cn-hangzhou.aliyuncs.com/cloudyhub/studio-demo-frontend:vtest

docker push registry.cn-hangzhou.aliyuncs.com/cloudyhub/studio-demo-frontend:vtest