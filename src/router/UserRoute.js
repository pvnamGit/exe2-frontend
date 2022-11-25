import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/user/Login/Login';
import Register from '../components/user/Register/Register';
import ForgotPassword from '../components/user/ForgotAndResetPassword/ForgotPassword';
import ResetPassword from '../components/user/ForgotAndResetPassword/ResetPassword';
import UserProfileRoute from './UserRoute/UserProfileRoute';

import Page404 from '../components/common/404';

import ToastProvider from '../context/toast.context';
import CourseRoute from './UserRoute/CourseRoute';
import HomePage from '../components/user/home/HomePage';
import AddMotorbikePage from '../components/administrator/course/AddMotorbikePage';
import SubscriptionPage from '../components/user/Subscription/SubscriptionPage';
import YourMotorbikePage from '../components/user/Course/YourMotorbikesPage';


const UserRoute = () => (
  <ToastProvider>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forget-password" component={ForgotPassword} />
      <Route exact path="/reset" component={ResetPassword} />
      <Route path="/motorbikes" component={CourseRoute} />
      <Route path="/your_motorbikes" component={YourMotorbikePage} />
      <Route path="/users" component={UserProfileRoute} />
      <Route path="/share-bike" component={AddMotorbikePage} />
      <Route path="/subscription" component={SubscriptionPage} />
      <Route path="/home" component={HomePage} />
      <Route exact path="/" component={HomePage} />
      <Route component={Page404} />
    </Switch>
  </ToastProvider>
);

export default UserRoute;
