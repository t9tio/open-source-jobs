FROM node:10-alpine
WORKDIR /code
RUN npm config set registry https://registry.npm.taobao.org && npm i -g nodemon dynamodb-admin parcel
