const AWS = require('aws-sdk');
const secret = require('../../secret.json');

console.log('NODE_ENV:', process.env.NODE_ENV);

// from command line
let awsConfig = {
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'local',
  secretAccessKey: 'local',
};

if (process.env.NODE_ENV === 'docker') {
  // inside docker
  awsConfig = {
    region: 'us-east-1',
    endpoint: 'http://dynamodb:8000',
    accessKeyId: 'local',
    secretAccessKey: 'local',
  };
} else if (process.env.NODE_ENV === 'production') {
  // on lambda server
  awsConfig = {
    region: 'us-east-1',
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    accessKeyId: secret.aws.accessKeyId,
    secretAccessKey: secret.aws.accessKeyId,
  };
}

AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamodb,
  docClient,
};
