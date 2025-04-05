FROM node:18-alpine

WORKDIR /usr/src/app

# 复制package*.json文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY . .

# 容器启动时运行的命令
CMD ["node", "server.js"]
