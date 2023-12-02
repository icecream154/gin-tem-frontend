npm install

npm run build

docker buildx build --platform linux/amd64 --tag cloudyhub:my-app-frontend -f Dockerfile .

docker rm my-app-frontend

docker run --name=my-app-frontend -dp 3000:80 cloudyhub:my-app-frontend