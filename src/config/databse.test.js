/* eslint-disable no-undef */
// require('dotenv-safe').config();
import database from './database.js';

test('MongoDB Connection', async () => {
  const connection = await database.connect();
  expect(connection).toBeTruthy();
});

test('MongoDB Disconnection', async () => {
  const isDisconnected = await database.disconnect();
  expect(isDisconnected).toBeTruthy();
});
