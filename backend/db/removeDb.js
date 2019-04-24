const { dynamodb } = require('.');

async function createTable() {
  try {
    console.log('going to remove table');
    await dynamodb.deleteTable({ TableName: 'user' }).promise();
    console.log('remove successfully');
  } catch (error) {
    console.log(error.message);
  }
}

createTable();
