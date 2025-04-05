# Docker 部署说明

本文档提供了使用 Docker 部署 Todo 应用的详细指南。

## 前提条件

- 安装 [Docker](https://docs.docker.com/get-docker/)
- 安装 [Docker Compose](https://docs.docker.com/compose/install/)

## 项目结构

项目包含以下 Docker 相关文件：

- `docker-compose.yml` - 定义和配置所有服务（MongoDB、API、前端）
- `server/Dockerfile` - 用于构建后端 API 服务
- `Dockerfile.frontend` - 用于构建前端应用
- `docker/nginx.conf` - 前端 Nginx 服务器配置

## 快速开始

### 1. 克隆代码库

```bash
git clone https://github.com/albertofwb/todo-app.git
cd todo-app
```

### 2. 构建和启动容器

使用 Docker Compose 构建并启动所有服务：

```bash
docker-compose up -d
```

这会在后台启动三个容器：
- MongoDB 数据库 (`todo-mongodb`)
- 后端 API 服务 (`todo-api`)
- 前端 Web 应用 (`todo-frontend`)

### 3. 访问应用

一旦容器启动完成，您可以通过以下方式访问应用：

- 前端应用：http://localhost
- 后端 API：http://localhost/api

## 环境变量配置

### MongoDB

在 `docker-compose.yml` 文件中，可以配置以下环境变量：

- `MONGO_INITDB_ROOT_USERNAME` - MongoDB 管理员用户名
- `MONGO_INITDB_ROOT_PASSWORD` - MongoDB 管理员密码

### 后端 API

- `PORT` - API 服务端口
- `MONGO_URI` - MongoDB 连接字符串
- `JWT_SECRET` - JWT 密钥
- `JWT_EXPIRE` - JWT 过期时间
- `NODE_ENV` - 部署环境（development 或 production）

### 前端

- `VITE_API_URL` - 后端 API 地址

## 数据持久化

MongoDB 数据被存储在一个命名卷 `mongo-data` 中，确保在容器重启后数据不会丢失。

## 管理容器

### 查看正在运行的容器

```bash
docker-compose ps
```

### 查看容器日志

```bash
# 查看所有容器的日志
docker-compose logs

# 查看特定服务的日志
docker-compose logs api
docker-compose logs frontend
docker-compose logs mongo
```

### 停止容器

```bash
docker-compose down
```

### 重启容器

```bash
docker-compose restart
```

## 常见问题

### 修改 API 地址

如果您的 API 服务部署在不同的地址，请更新 `Dockerfile.frontend` 中的 `VITE_API_URL` 环境变量，然后重新构建前端镜像。

### 数据库备份

要备份 MongoDB 数据，可以使用以下命令：

```bash
docker exec todo-mongodb sh -c 'mongodump --authenticationDatabase admin -u admin -p password --archive' > mongodb-backup.archive
```

### 恢复数据库

要恢复 MongoDB 数据，可以使用以下命令：

```bash
docker exec -i todo-mongodb sh -c 'mongorestore --authenticationDatabase admin -u admin -p password --archive' < mongodb-backup.archive
```

## 生产环境部署注意事项

在生产环境中部署时，请确保：

1. 更改所有默认密码
2. 配置适当的网络安全规则
3. 考虑使用 HTTPS
4. 设置适当的资源限制（内存、CPU）
5. 配置监控和日志记录
