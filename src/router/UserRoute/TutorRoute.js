import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TutorPage from '../../components/user/ShareBike/TutorPage';
import UserProvider from '../../context/user.context';

const TutorRoute = () => {
  return (
    <UserProvider>
      <Switch>
          <Route exact path="/share-bike" component={TutorPage} />
      </Switch>
    </UserProvider>
  );
};

export default TutorRoute;
