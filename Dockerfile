FROM nginx:stable-alpine

COPY build/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf  # <= This line solved my issue
COPY nginx.conf /etc/nginx/conf.d

# ssl证书配置
COPY cloudyhub.cn.key /etc/nginx/
COPY cloudyhub.cn.pem /etc/nginx/

EXPOSE 80