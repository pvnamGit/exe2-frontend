import { APIService } from './api.service';
import URLService from './URL.service';
import {
  COURSES, COURSE_INFO, COURSE_REGISTER, MOTORBIKES,
} from '../config/route';

class MotorbikesService {

  static async getCourseList(setting = {}, auth) {
    try {
      if (!setting.page) setting.page = 1;
      if (!setting.limit) setting.limit = 20;
      const queryString = URLService.stringify(setting);
      const response = await new APIService(
        'get',
        MOTORBIKES + '?' + queryString,
        null,
        null,
        auth,
      ).request();
      return {
        courseList: response.courseList,
        totalCourse: response.totalCourse,
      };
    } catch (error) {
      return {
        courseList: [],
        totalCourse: 0,
      };;
    }
  }

  static async registerCourse(id) {
    try {
      await new APIService(
        'post',
        COURSE_REGISTER,
        {
          id
        },
        null,
        true,
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async getCourse(id, auth) {
    // return {
    //   coureName: 'Demo Course Name',
    //   courseDescription: 'this is a demo course. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. it is hard coded>. ',
    //   subject: {
    //     id: 1,
    //     subjectName: 'TOAN',
    //   },
    //   grade: 12,
    //   cost: 250000,
    //   length: 180,
    //   tutor: {
    //     avatar: 'data:image/jpeg;base64,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',
    //     fullname: 'Demo Tutor',
    //     email: 'tutor@gmail.com',
    //     phone: '0922313341',
    //     facebookUrl: 'www.facebook.com/demotutor',
    //   }
    // }
    try {
      const response = await new APIService(
        'get',
        COURSE_INFO,
        { id },
        null,
        auth,
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  }
}

export default MotorbikesService;
