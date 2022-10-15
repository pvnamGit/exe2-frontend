import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ForumPage from '../../components/user/forum/ForumPage';
import ForumProvider from '../../context/forum.context';

const ForumRoute = () => {
  return (
    <ForumProvider>
      <Switch>
        <Route exact path="subscription" component={ForumPage} />
      </Switch>
    </ForumProvider>
  );
};

export default ForumRoute;
