import { APIService } from './api.service';
import { SUBJECTS } from '../config/route';

class UserService {
  static async getBikeType() {
      return [
          {
              id: 1,
              name: 'Manual Bike'
          },
          {
              id: 2,
              name: 'Automatic Bike',
          },
          {
              id: 3,
              name: 'Electronic Bike',
          }
      ]
    // try {
    //   const response = await new APIService(
    //     'get',
    //     SUBJECTS,
    //   ).request();
    //   return response;
    // } catch (error) {
    //   return [];
    // }
  }
}

export default UserService;
