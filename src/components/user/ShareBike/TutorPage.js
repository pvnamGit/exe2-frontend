import { Grid } from '@mui/material';
import React from 'react';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';

const TutorPage = (props) => {
  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Share Bike'],
        ]}
      />
      <Body>
        <Grid
          item
          md={12}
          xs={12}
        >
        </Grid>
      </Body>
    </>
  );
}

export default TutorPage;