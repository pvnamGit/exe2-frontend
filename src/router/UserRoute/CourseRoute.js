import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page404 from '../../components/common/404';
import MotobikesPage from '../../components/user/Course/MotobikesPage';
import MotobikesProvider from '../../context/motobikes.context';
import MotorbikeInfo from '../../components/user/Course/MotorbikeInfo';
import AdminCourseMaterialProvider from '../../context/adminCourseMaterial.context';
import AdminCourseTimetableProvider from '../../context/adminCourseTimetable.context';
import SubscriptionPage from '../../components/user/Subscription/SubscriptionPage';

const CourseRoute = () => {

  return (
    <MotobikesProvider>
      <AdminCourseMaterialProvider>
        <AdminCourseTimetableProvider>
          <Switch>
            <Route path="/motobike/:id" component={SubscriptionPage} />
            <Route path="/motobikes" component={MotobikesPage} />
            <Route component={Page404} />
          </Switch>
        </AdminCourseTimetableProvider>
      </AdminCourseMaterialProvider>
    </MotobikesProvider>
  );
};

export default CourseRoute;
