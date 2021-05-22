import { UserService } from '../../api/services/index.js';
import logger from '../../utils/logger.js';

export default {
  Query: {
    allUsers: () => UserService.allUsers(),
    fieldName: (_, { login }, { dataSources }) => {
      logger.info(dataSources);
      return UserService.findBy({ login });
    },
    versionAuth: () => 'Radiolife version auth: 1.0.0-rc-01',
  },

  Mutation: {
    register: (_, { input }) => UserService.register(input),
  },
};
