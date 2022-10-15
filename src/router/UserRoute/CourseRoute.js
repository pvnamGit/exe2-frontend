import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page404 from '../../components/common/404';
import MotorbikesPage from '../../components/user/Course/MotorbikesPage';
import MotorbikesProvider from '../../context/motorbikes.context';
import AdminCourseMaterialProvider from '../../context/adminCourseMaterial.context';
import AdminCourseTimetableProvider from '../../context/adminCourseTimetable.context';
import MotorbikeInfo from '../../components/user/Course/MotorbikeInfo';

const CourseRoute = () => {

  return (
    <MotorbikesProvider>
      <AdminCourseMaterialProvider>
        <AdminCourseTimetableProvider>
          <Switch>
            <Route path="/motorbikes/:mid" component={MotorbikeInfo} />
            <Route path="/motorbikes" component={MotorbikesPage} />
            <Route component={Page404} />
          </Switch>
        </AdminCourseTimetableProvider>
      </AdminCourseMaterialProvider>
    </MotorbikesProvider>
  );
};

export default CourseRoute;
