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
- `.env.example` - 环境变量模板文件

## 快速开始

### 1. 克隆代码库

```bash
git clone https://github.com/albertofwb/todo-app.git
cd todo-app
```

### 2. 设置环境变量

复制环境变量模板文件并根据需要修改：

```bash
cp .env.example .env
```

编辑 `.env` 文件，设置您的自定义值，特别是密码和密钥。

### 3. 构建和启动容器

使用 Docker Compose 构建并启动所有服务：

```bash
docker-compose up -d
```

这会在后台启动三个容器：
- MongoDB 数据库 (`todo-mongodb`)
- 后端 API 服务 (`todo-api`)
- 前端 Web 应用 (`todo-frontend`)

### 4. 访问应用

一旦容器启动完成，您可以通过以下方式访问应用：

- 前端应用：http://localhost（或您在 .env 文件中设置的端口）
- 后端 API：http://localhost/api

## 环境变量配置

在 `.env` 文件中，您可以配置以下变量：

### MongoDB

- `MONGO_INITDB_ROOT_USERNAME` - MongoDB 管理员用户名
- `MONGO_INITDB_ROOT_PASSWORD` - MongoDB 管理员密码
- `MONGO_DATABASE` - 数据库名称

### 后端 API

- `API_PORT` - API 服务端口
- `JWT_SECRET` - JWT 密钥
- `JWT_EXPIRE` - JWT 过期时间
- `NODE_ENV` - 部署环境（development 或 production）

### 前端

- `FRONTEND_PORT` - 前端应用端口

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

### 修改环境变量

如果您需要修改环境变量，只需更新 `.env` 文件然后重新构建并启动容器：

```bash
docker-compose down
docker-compose up -d --build
```

### 数据库备份

要备份 MongoDB 数据，可以使用以下命令：

```bash
docker exec todo-mongodb sh -c 'mongodump --authenticationDatabase admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --archive' > mongodb-backup.archive
```

### 恢复数据库

要恢复 MongoDB 数据，可以使用以下命令：

```bash
docker exec -i todo-mongodb sh -c 'mongorestore --authenticationDatabase admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --archive' < mongodb-backup.archive
```

## 多环境部署

对于需要在不同环境（开发、测试、生产）中部署的案例，您可以创建多个环境变量文件：

```
.env.development
.env.test
.env.production
```

然后使用特定环境的文件启动应用：

```bash
# 开发环境
docker-compose --env-file .env.development up -d

# 生产环境
docker-compose --env-file .env.production up -d
```

## CI/CD 集成

您可以将 Docker 部署集成到常见的 CI/CD 流程中。下面是一个 GitHub Actions 工作流程的示例：

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}
      
      - name: Build and push API image
        uses: docker/build-push-action@v4
        with:
          context: ./server
          push: true
          tags: yourusername/todo-api:latest
      
      - name: Build and push Frontend image
        uses: docker/build-push-action@v4
        with:
          context: .
          file: ./Dockerfile.frontend
          push: true
          tags: yourusername/todo-frontend:latest
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /path/to/deployment
            docker-compose pull
            docker-compose up -d
```

要使用此工作流程，您需要在 GitHub 仓库设置中添加相应的密钥。

## 扩展与扩展性

对于需要处理大量访问量的应用，可以考虑以下扩展选项：

1. **使用 Docker Swarm 或 Kubernetes**：管理容器集群，实现自动扩展和失效恢复。

2. **水平扩展 API 服务**：使用负载均衡器分发流量到多个 API 实例。

3. **数据库复制**：设置 MongoDB 副本集或分片，提高数据库加载性能和可用性。

4. **缓存层**：添加 Redis 或其他缓存服务，减轻数据库负载并提高响应时间。

这些扩展选项可以根据应用需求和增长情况逐步添加。

## 生产环境部署注意事项

在生产环境中部署时，请确保：

1. 使用强密码和密钥，特别是 `MONGO_INITDB_ROOT_PASSWORD` 和 `JWT_SECRET`
2. 考虑使用外部的密钥管理服务，而不是直接在 .env 文件中存储敏感信息
3. 配置适当的网络安全规则
4. 考虑使用 HTTPS
5. 设置适当的资源限制（内存、CPU）
6. 配置监控和日志记录
