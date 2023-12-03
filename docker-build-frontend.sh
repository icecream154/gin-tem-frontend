npm install

npm run build

docker buildx build --platform linux/amd64 --tag cloudyhub:askomo-frontend -f Dockerfile .

docker rm -f askomo-frontend

docker run --name=askomo-frontend -dp 2998:80 cloudyhub:askomo-frontend