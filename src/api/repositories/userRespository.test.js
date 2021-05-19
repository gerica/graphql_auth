/* eslint-disable no-underscore-dangle */
import {
  afterAll,
  beforeAll,
  expect,
  test,
  //
} from '@jest/globals';

import UserRepository from './userRepository.js';

let testId = null;
const user = { name: 'User Test', lastname: 'Last Name Test' };

beforeAll(async () => {
  const result = await UserRepository.insert(user);
  testId = result.insertedId;
});

afterAll(async () => {
  if (testId) {
    await UserRepository.delete(testId);
  }
});

test('Repository GetAllUsers', async () => {
  const list = await UserRepository.getAll();
  expect(Array.isArray(list)).toBeTruthy();
  expect(list.length).toBeGreaterThan(0);
});

test('Repository GetById', async () => {
  const result = await UserRepository.getById(testId);
  expect(result).toBeTruthy();
  expect(result._id).not.toBeNull();
});

test('Repository GetByContent', async () => {
  const result = await UserRepository.findBy(user);
  expect(result).toBeTruthy();
  expect(result._id).not.toBeNull();
});
