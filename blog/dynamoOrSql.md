最近在作 open source jobs 这个网站，决定采用 serverless 的方式开发，服务器使用 aws lambda，数据库的话在 AWS RDS(托管的 SQL 数据库)和dynamodb(serverless NOSQL 数据库)纠结很久无法决定。在此罗列下二者优缺点

What should I use dynamodb or rds?

dynamo: 
  - serverless
  - cheaper for simple use case
sql: 
  - relational database make develop APP feels better

dynamo:
  - 用起来麻烦

sql:
  - 贵: 最便宜的 RDS instance(t3 small reserved instance): $196 per year
  - connections are limited, 如果 lambda 很多，连起来可能会有问题?


吹捧dynamo https://hackernoon.com/the-upside-down-world-of-dynamodb-8170411492c0


free tier
25 个 WCU 和 25 个 RCU 的预置容量
25 GB 的数据存储
部署在两个 WAS 区域的全局表需要 25 个 rWCU
250 万个来自 DynamoDB Streams 的流读取请求
适用于所有 AWS 服务的共计 1GB 的数据传出量（前 12 个月为 15GB）