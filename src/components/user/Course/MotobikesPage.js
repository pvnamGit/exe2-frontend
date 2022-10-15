import React, { useContext, useState } from 'react';
import { AuthenticationContext } from '../../../context/authentication.context';
import { MotobikesContext } from '../../../context/motobikes.context';
import MotorbikesService from '../../../services/motorbikes.service';
import Body, { Main, SideBar } from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
// import PublicCourseFilter from './BikeFilter';
import MotobikeList from './MotobikeList';

const MotorbikesPage = (props) => {

  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Motobikes'],
        ]}
      />
      <Body>
        {/* <SideBar>
          <PublicCourseFilter
            onGetMotobikesList={onGetMotobikeList}
          />
        </SideBar> */}
        <Main>
          <MotobikeList
          />
        </Main>
      </Body>
    </>
  );
}

export default MotorbikesPage;