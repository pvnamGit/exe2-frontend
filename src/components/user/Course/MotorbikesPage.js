import React, { useContext, useState } from 'react';
import { AuthenticationContext } from '../../../context/authentication.context';
import MotorbikesService from '../../../services/motorbikes.service';
import Body, { Main, SideBar } from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
// import PublicCourseFilter from './BikeFilter';
import MotorbikeList from './MotorbikeList';
import MotorbikeYourList from './MotorbikeYourList';


const MotorbikesPage = (props) => {

  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Motorbikes'],
        ]}
      />
      <Body>
        {/* <SideBar>
          <PublicCourseFilter
            onGetMotorbikesList={onGetMotorbikeList}
          />
        </SideBar> */}
        <Main>
          <MotorbikeList
          />
        </Main>
      </Body>
    </>
  );
}

export default MotorbikesPage;