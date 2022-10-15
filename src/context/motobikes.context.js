import React from 'react';
import CourseService from '../services/course.service';

export const MotobikesContext = React.createContext();

class CourseProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motobikesList: [],
      total: 0,
      motobikes: {},
      limit: 18,
      getMotobikesList: this.getMotobikesList,
      getMotobike: this.getMotobike,
      register: this.register,
    };
  }

  getMotobikesList = async (setting, auth) => {
    console.log(auth);
    const response = await CourseService.getCourseList({ ...setting, limit: this.state.limit }, auth);
    if (typeof response === 'string') {
        return;
    } else {
        this.setState({ courseList: response.courseList, totalCourse: response.totalCourse });
    }
  }

  getMotobike = async (id, auth = false) => {
    let newCourse = null;
    // if (auth) {
    //   newCourse = await MotorbikesService.getCourse(id);
    // } else {
    //   newCourse = await CourseService.getCourse(id);
    // }
    newCourse = await CourseService.getCourse(id, auth);
    if (typeof newCourse === 'string') {
      return null;
    }

    this.setState({ course: newCourse });
    return newCourse;
  }

  register = async (courseId) => {
    const response = await CourseService.registerCourse(courseId);
    if (typeof response === 'string') {
      return response;
    }

    const { courseList } = this.state;
    const index = courseList.findIndex((c) => c.id === courseId);
    courseList[index].registered = true;
    this.setState({ courseList });

    return response;
  }

  componentDidMount() {
    this.getMotobikesList({});
  }

  render() {
    const { children } = this.props;
    return (
      <MotobikesContext.Provider value={this.state}>
        { children }
      </MotobikesContext.Provider>
    );
  }
}

export default CourseProvider;
