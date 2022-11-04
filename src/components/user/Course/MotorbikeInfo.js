import {
  Grid,
  Typography,
  Box,
} from '@mui/material';
import {
  useTheme,
  alpha,
} from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import Body from '../../basic/Body';
import Page404 from '../../common/404';
import NavigationBar from '../../common/NavigationBar';
import MotorbikesService from '../../../services/motorbikes.service';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';




const MotorbikeInfo = (props) => {
  const { match } = props;
  const [fetched, setFetched] = useState(false); 
  const [motorbike, setMotorbike] = useState({});

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
    }
    fetchMotorbike(motorbike.id);
    setFetched(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <Box sx={{
                  width: 300,
                  height: 300,
                }}>
            <img style={{width: '350px'}} src={ motorbike.filePath ? motorbike.filePath : 'url(/logo.png)'} alt='example' />
          </Box>
          <Box> 
            <Typography style={{ marginTop: '-30px', fontSize: '24px'}} variant="overline" component="h1">
              {motorbike.title}
            </Typography>
            <Typography mt={1} variant="subtitle1">
              Description
            </Typography>
            <Typography variant='caption'>
              {motorbike.description}
            </Typography>
            <Typography mt={1} variant="subtitle1">
              Contact
            </Typography>
            <Typography variant='caption'>
              {motorbike.contactInfo}
            </Typography>
            <Typography mt={1} variant="subtitle1">
              <b>
                Cost: {motorbike.cost} VND/{motorbike.contactInfo}
              </b>
            </Typography>
            <Typography mt={1} variant='subtitle1'>
              Duraytion day: {motorbike.contactInfo}
            </Typography>
          </Box>
        </Box>
      </Body>
    </>
  );
}

export default MotorbikeInfo;