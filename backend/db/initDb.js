const { dynamodb } = require('.');

async function createTable() {
  console.log('going to create table');
  await dynamodb.createTable({
    TableName: 'user',
    KeySchema: [
      { AttributeName: 'date', KeyType: 'HASH' }, // Partition key
      { AttributeName: 'id', KeyType: 'RANGE' }, // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'date', AttributeType: 'S' },
      { AttributeName: 'id', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  }).promise();
  console.log('successfully created table "user"');
}

createTable();
