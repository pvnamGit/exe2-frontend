import AdminAPIService from './adminAPI.service';
import URLService from './URL.service';
import {
  MOTORBIKES, MOTORBIKE_ID,
} from '../config/route';
import { APIService } from './api.service';

class MotorbikesService {

  static async getMotorbikesList() {
    try {
      const response = await new APIService(
        'get',
        MOTORBIKES,
        null,
      ).request();
      return {
        data: response.data,
      };
    } catch (error) {
      return error.message;
    }
  }

  static async createMotorbike(info) {
    try {
      const response = await new APIService(
        'post',
        MOTORBIKES,
        null,
        info,
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async getMotorbike() {
    try {
      const response = await new APIService(
        'get',
        MOTORBIKE_ID,
        null,
        null,
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  }
}

export default MotorbikesService;
