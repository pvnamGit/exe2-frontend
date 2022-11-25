import {
  Grid,
  Typography,
  Box,
  
} from '@mui/material';
import Button from '@mui/material/Button';

import {
  useTheme,
  alpha,
} from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import MotorbikesService from '../../../services/motorbikes.service';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserInformation } from '../../../utils/cookies'; 
import UserService from '../../../services/user.service';
import EditMotorbikePage from './EditMotorbikePage';
import { Link } from 'react-router-dom';

const MotorbikeInfo = (props) => {
  const { match } = props;
  const [fetched, setFetched] = useState(false); 
  const [motorbike, setMotorbike] = useState({});
  const [userId, setUserId]= useState();
  const [user, setUser] = useState({});

 
  useEffect(() => {
    const fetchUser = async () => {
      if (getUserInformation()) {
        const newUser = await UserService.getUserProfile(getUserInformation().id);
        setUser(newUser);
      }
    }
    fetchUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setFetched(true);
    if (!Number.isInteger(parseInt(match.params.mid, 10))) {
      return <Redirect to="/" />;
    }
    const mid = parseInt(match.params.mid, 10)
    console.log("🚀 ~ file: MotorbikeInfo.js ~ line 34 ~ useEffect ~ mid", mid)
    const fetchMotorbike = async () => {
      const moto = await MotorbikesService.getMotorbike(mid);
      setMotorbike(moto.data);
      setUserId(moto.userId);
    }
    fetchMotorbike(motorbike.id);
    setFetched(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])
  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Motorbikes', '/'],
          [match.params.mid]
        ]}
      />
      <Body>
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%'
        }}>
         <div>
         {/* <Box sx={{
                  width: 300,
                  height: 300,
                }}>
            <img style={{maxWidth: '500px', maxHeight: '400px'}} src={ motorbike.filePath ? motorbike.filePath : "/image/homepage_motorbike_go.png"} alt='example' />
          </Box> */}
         </div>
          
          <div className="MainContainer" >
            <div className="Product">
            <img  src={ motorbike.filePath ? motorbike.filePath : "/image/homepage_motorbike_go.png"} alt='example' />
            </div>
            <div className="ProductData">
              <Box > 
            <Typography style={{ marginTop: '-30px', fontSize: '28px'}} variant="subtitle2">
              {motorbike.title}
            </Typography>
            <Typography mt={2} variant="h6" >
            <b>Description</b>
            </Typography>
            <Typography style={{display: "list-item"}} mt={1} ml={2} variant='body1'>
            {motorbike.description}
            </Typography>
            <Typography mt={2} variant="h6">
              <b>Contact</b>
            </Typography>
            <Typography style={{display: "list-item"}} mt={1} ml={2} variant='body1'>
              {motorbike.contactInfo}
            </Typography>
            <Typography mt={2} variant="subtitle1">
              <b>
                Cost: {motorbike.cost}.000 VND
              </b>
            </Typography>
            <Typography mt={1} variant='subtitle1'>
              Duration day: {motorbike.durationDay} day(s)
            </Typography>
            {user.id === userId ? (
                            <Link></Link>
            ): (<h2></h2>)}
          </Box>
           </div>
          
          </div>










          {/* <Box style={{marginTop: '50px'}}> 
            <Typography style={{ marginTop: '-30px', fontSize: '28px'}} variant="h1">
              {motorbike.title}
            </Typography>
            <Typography mt={2} variant="h6" >
            <b>Description</b>
            </Typography>
            <Typography style={{display: "list-item"}} mt={1} ml={2} variant='body1'>
            {motorbike.description}
            </Typography>
            <Typography mt={2} variant="h6">
              <b>Contact</b>
            </Typography>
            <Typography style={{display: "list-item"}} mt={1} ml={2} variant='body1'>
              {motorbike.contactInfo}
            </Typography>
            <Typography mt={2} variant="subtitle1">
              <b>
                Cost: {motorbike.cost}.000 VND
              </b>
            </Typography>
            <Typography mt={1} variant='subtitle1'>
              Duration day: {motorbike.durationDay} day(s)
            </Typography>
          </Box> */}
        </Box>
      </Body>
    </>
  );
}

export default MotorbikeInfo;