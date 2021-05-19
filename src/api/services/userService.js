import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/constants.js';
import logger from '../../utils/logger.js';
import UserRepository from '../repositories/userRepository.js';

class UserService {
  static async register({ login, password }) {
    logger.info('register');

    const { insertedId } = await UserRepository.insert({
      login,
      password: await bcrypt.hash(password, 10),
    });
    const user = await UserRepository.getById(insertedId);
    // const newUser = new User(id, login, password);

    return jsonwebtoken.sign({ id: user._id, login: user.login }, JWT_SECRET, {
      expiresIn: '3m',
    });
  }

  static async findBy(clauser) {
    const result = await UserRepository.findBy(clauser);
    if (result) {
      return { ...result, id: result._id };
    }
    return new Error('Nenhum usuário encontrado');
  }

  static async allUsers() {
    const result = await UserRepository.getAll();
    return UserService.parseResponse(result);
  }

  static parseResponse(result) {
    return result.map((obj) => ({ ...obj, id: obj._id }));
  }
}
export default UserService;
