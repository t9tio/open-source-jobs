const { dynamodb, docClient } = require('./index');

async function createTable() {
  console.log('going to create "user" table');
  await dynamodb.createTable({
    TableName: 'user',
    KeySchema: [
      { AttributeName: 'githubId', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'githubId', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  }).promise();
  console.log('successfully created table "user"');
}

async function deleteTable() {
  await dynamodb.deleteTable({ TableName: 'user' }).promise();
}

async function get({ githubId }) {
  const { Item } = await docClient.get({
    TableName: 'user',
    Key: {
      githubId,
    },
  }).promise();
  return Item;
}

async function put({
  githubId, username, name, email, photo,
}) {
  await docClient.put({
    TableName: 'user',
    Item: {
      githubId, username, name, email, photo,
    },
  }).promise();
}

module.exports = {
  createTable,
  deleteTable,
  get,
  put,
};
