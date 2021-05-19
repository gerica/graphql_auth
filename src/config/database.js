import mongodb from 'mongodb';
import config from './config.js';

const { MongoClient } = mongodb;

let client = null;
const { DATABASE_NAME, MONGO_CONNECTION } = config;

async function connect() {
  if (client && client.isConnected()) {
    return client.db(DATABASE_NAME);
  }

  if (!client) {
    client = MongoClient(MONGO_CONNECTION, { useUnifiedTopology: true });
  }

  if (!client.isConnected()) {
    await client.connect();
  }

  return connect();
}

async function disconnect() {
  if (!client || !client.isConnected()) {
    return true;
  }
  await client.close();
  client = null;
  return true;
}

export default { connect, disconnect };
