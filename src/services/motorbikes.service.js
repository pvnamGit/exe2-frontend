import AdminAPIService from './adminAPI.service';
import URLService from './URL.service';
import {
  MOTORBIKES, MOTORBIKE_ID,
} from '../config/route';
import { APIService } from './api.service';

class MotorbikesService {

  static async getMotorbikesList(setting = {}) {
    const queryString = URLService.stringify(setting);
    try {
      const response = await new APIService(
        'get',
        MOTORBIKES + '?' + queryString,
        null,
      ).request();
      return {
        data: response,
      };
    } catch (error) {
      return error.message;
    }
  }

  static async createMotorbike(info) {
    const form = new FormData();
    Object.keys(info).forEach((key) => {
      form.append(key, info[key]);
    });
    try {
      const response = await new APIService(
        'post',
        MOTORBIKES,
        null,
        form,
        {
          'Content-Type': 'multipart/form-data',
        }
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async getMotorbike(mid) {
    try {
      const response = await new APIService(
        'get',
        MOTORBIKE_ID,
        {mid},
        null,
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  }
}

export default MotorbikesService;
