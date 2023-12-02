npm run build

docker buildx build --platform linux/amd64 --tag cloudyhub:studio-demo-frontend -f Dockerfile .

docker tag cloudyhub:studio-demo-frontend registry.cn-hangzhou.aliyuncs.com/cloudyhub/studio-demo-frontend:vtest

docker push registry.cn-hangzhou.aliyuncs.com/cloudyhub/studio-demo-frontend:vtest