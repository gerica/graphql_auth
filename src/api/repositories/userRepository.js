// import { ObjectId } from 'mongodb';
import database from '../../config/database.js';
import config from '../../config/config.js';
import logger from '../../utils/logger.js';

const { DB_USER } = config;

class UserRepository {
  static async insert(payload) {
    logger.info('UserRepository insert');
    let result;
    try {
      const collectionDb = await UserRepository.getCollectionUser();
      // create a document to be inserted
      result = await collectionDb.insertOne(payload);
      logger.info(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`);
    } finally {
      await database.disconnect();
    }
    return result;
  }

  static async delete(id) {
    logger.info('UserRepository delete');
    try {
      const collectionDb = await UserRepository.getCollectionUser();
      // Query for a movie that has a title of type string
      const query = { _id: id };
      const result = await collectionDb.deleteOne(query);
      if (result.deletedCount === 1) {
        logger.info('Successfully deleted one document.');
      } else {
        logger.info('No documents matched the query. Deleted 0 documents.');
      }
    } finally {
      await database.disconnect();
    }
  }

  static async getAll() {
    logger.info('UserRepository getAll');
    const collectionDb = await UserRepository.getCollectionUser();
    return collectionDb.find().toArray();
  }

  static async getById(id) {
    logger.info('UserRepository get by id');
    let listResult;
    try {
      const collectionDb = await UserRepository.getCollectionUser();
      // Query for a movie that has the title 'The Room'
      const query = { _id: id };
      listResult = await collectionDb.findOne(query);
      // since this method returns the matched document, not a cursor, print it directly
      logger.debug(listResult);
    } finally {
      await database.disconnect();
    }
    return listResult;
  }

  static async findBy(payload) {
    logger.info('UserRepository findBy');
    let result;
    try {
      const collectionDb = await UserRepository.getCollectionUser();
      logger.info(payload);
      result = await collectionDb.findOne(payload);
      logger.debug(result);
    } finally {
      await database.disconnect();
    }
    return result;
  }

  static async getCollectionUser() {
    const db = await database.connect();
    const collectionDb = db.collection(DB_USER);
    return collectionDb;
  }
}

export default UserRepository;
