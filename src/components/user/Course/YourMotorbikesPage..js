import React, { useContext, useState } from 'react';
import Body, { Main} from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import MotorbikeYourList from './MotorbikeYourList';
const YourMotorbikePage = () => {
    return ( 
        <>
        <NavigationBar
          nav={[
            ['Home', '/'],
            ['your_motorbikes'],
          ]}
        />
        <Body>
          <Main>
            <MotorbikeYourList
            />
          </Main>
        </Body>
      </>
     );
}
 
export default YourMotorbikePage;