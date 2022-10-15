import AdminAPIService from './adminAPI.service';
import URLService from './URL.service';
import {
  USERS, USER, USER_TYPE, USER_ROLE,
} from '../config/route';

class AdminUsersService {
  static async getUserList(setting = { page: 1, limit: 20 }) {
    try {
      const queryString = URLService.stringify(setting);
      const response = await new AdminAPIService(
        'get',
        USERS + '?' + queryString,
        {
          queryString,
        },
      ).request();
      return {
        users: response.userList || [],
        totalUsers: response.totalUser || 0,
      }
      // return {
      //   users: response.users,
      //   totalUsers: response.totalUsers,
      // };
    } catch (error) {
      return {
        users: [],
        totalUsers: 0,
      };
    }
  }

  static async changeUserRole(role, username) {
    try {
      await new AdminAPIService(
        'put',
        USER_ROLE,
        { id: username },
        { role: role },
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async deleteUser(id) {
    try {
      await new AdminAPIService(
        'delete',
        USER,
        { id },
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async updateUser(id, user) {
    try {
      await new AdminAPIService(
        'put',
        USER,
        { id },
        user,
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async getUserTypes() {
    try {
      const response = await new AdminAPIService(
        'get',
        USER_TYPE,
      ).request();
      return response.usertypes;
    } catch (error) {
      return [];
    }
  }
}

export default AdminUsersService;
