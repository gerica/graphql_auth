import { UserService } from '../../api/services/index.js';
import logger from '../../utils/logger.js';

export default {
  Query: {
    allUsers: () => UserService.allUsers(),
    fieldName: (_, { login }, { dataSources }) => {
      logger.info(dataSources);
      return UserService.findBy({ login });
    },
  },

  Mutation: {
    register: (_, { input }) => UserService.register(input),
  },
};
