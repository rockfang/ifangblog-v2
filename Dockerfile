# build stage
FROM node:lts-alpine as build-stage
# 默认进入工作目录，不存在会创建
WORKDIR /app

COPY package*.json ./
RUN npm install
# 拷贝当前文件到容器工作目录(/app)
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 拷贝nginx配置
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]