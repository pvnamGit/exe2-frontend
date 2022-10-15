/* eslint-disable react/no-unused-state */
import React from 'react';
import MotorbikesService from '../services/motorbikes.service';

export const AdminMotorbikesContext = React.createContext();

class AdminMotorbikesProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motorbikesList: [],
      total: 0,
      limit: 24,
      motorbike: {},
      getMotorbikesList: this.getMotorbikesList,
      getMotorbike: this.getMotorbike,
      updateMotorbike: this.updateCourse,
      deleteMotorbike: this.deleteCourse,
      createMotorbike: this.createMotorbike,
      publicMotorbike: this.publicCourse,
      replyRegister: this.replyRegister,
    };
  }

  getMotorbikesList = async (setting) => {
    const { limit } = this.state;
    const response = await MotorbikesService.getMotorbikesList({ ...setting, limit });
    if (typeof response === 'string') {
        return response;
    } else {
        this.setState({ motorbikesList: response.motorbikesList, totalCourse: response.totalCourse });
        return response;
    }
  }

  getMotorbike = async (id) => {
    const { motorbikesList } = this.state;
    const motorbike = motorbikesList.find((c) => c.id === id);
    
    if (motorbike) {
      this.setState({ motorbike });
      return motorbike;
    }

    const newCourse = await MotorbikesService.getMotorbike(id);
    if (typeof newCourse === 'string') {
      return {};
    }
    motorbikesList.push(newCourse);
    this.setState({ motorbikesList, motorbike: newCourse });
    return newCourse;
  }

  createMotorbike = async (info) => {
    console.log("🚀 ~ file: adminMotorbikes.context.js ~ line 55 ~ AdminMotorbikesProvider ~ createMotorbike= ~ info", info)
    const newMotorbikes = await MotorbikesService.createMotorbike(info);
    if (typeof newMotorbikes === 'string') {
        return newMotorbikes;
    }
    const { motorbikesList } = this.state;
    motorbikesList.push(newMotorbikes);
    this.setState({ motorbikesList });
    return newMotorbikes;
  }

  deleteCourse = async (id) => {
    const response = await MotorbikesService.deleteCourse(id);
    if (typeof response === 'string') {
      return response;
    }
    const { motorbikesList } = this.state;
    const index = motorbikesList.findIndex((c) => c.id === id);
    motorbikesList.splice(index, 1);
    this.setState({ motorbikesList });
  }

  publicCourse = async (id, value) => {
    const response = await MotorbikesService.togglePublicCourse(id, { course_status: value });
    if (typeof response === 'string') {
      return response;
    }
    const { motorbikesList } = this.state;
    const index = motorbikesList.findIndex((c) => c.id === id);
    const motorbike = motorbikesList.find((c) => c.id === id);
    motorbike.publicStatus = !motorbike.publicStatus;
    motorbikesList.splice(index, 1, motorbike);
    this.setState({ motorbikesList });
    return null;
  }

  replyRegister = async (id, action, motorbike) => {
    const response = await MotorbikesService.replyCourseRegister(id, action);
    if (typeof response === 'string') {
      return response;
    }
    const { motorbikesList } = this.state;
    const index = motorbikesList.findIndex((c) => c.id === id);
    if (!action) {
      delete motorbike.student;
    } else {
      motorbike.courseStatus = false;
    }
    motorbikesList.splice(index, 1, motorbike);
    this.setState({ motorbikesList });
    return null;
  }

  updateCourse = async (motorbike) => {
    const { motorbike: origin } = this.state;
    const packData = {};
    Object.keys(motorbike).forEach((key) => {
      if (motorbike[key] !== origin[key]) {
        packData[key] = motorbike[key];
      }
    });
    const response = await MotorbikesService.updateCourse(motorbike.id, packData);
    if (typeof response === 'string') {
      return response;
    }
    const { motorbikesList } = this.state;
    const index = motorbikesList.findIndex((c) => c.id === motorbike.id);
    motorbikesList.splice(index, 1, response);
    this.setState({ motorbikesList });
  }

  componentDidMount() {
    this.getMotorbikesList();
  }

  render() {
    const { children } = this.props;
    return (
      <AdminMotorbikesContext.Provider value={this.state}>
        { children }
      </AdminMotorbikesContext.Provider>
    );
  }
}

export default AdminMotorbikesProvider;
