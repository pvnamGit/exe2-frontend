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
import { MotobikesContext } from '../../../context/motobikes.context';
import Body from '../../basic/Body';
import Page404 from '../../common/404';
import NavigationBar from '../../common/NavigationBar';
import MotorbikesService from '../../../services/motorbikes.service';




const MotorbikeInfo = (props) => {
  const motobikesContext = useContext(MotobikesContext);
  const [fetched, setFetched] = useState(false); 
  const [motorbike, setMotorbike] = useState({});
  const theme = useTheme();

  console.log('hihhi')

  useEffect(() => {
    setFetched(false);
    const fetchMotorbike = async (id) => {
      const motobike = await MotorbikesService.getMotorbike(id);
      setMotorbike(motobike.data);
    }
    fetchMotorbike(motorbike.id);
    setFetched(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Motorbike', '/'],
          [motorbike.id || ''],
        ]}
      />
      <Body>
        <Grid item md={12} xs={12}>
          <Box
            sx={{
              border: 3,
              borderBottom: 1,
              borderColor: 'primary.main',
              backgroundImage: 'url(/image/background/hire_example.jpg)',
              bgcolor: alpha(theme.palette.primary.main, 0.3),
              borderTopLeftRadius: 5,
              borderTopRightRadius: 25,
              position: 'relative',
              mt: 7,
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              flexWrap="wrap"
              sx={{
                minHeight: '10.8rem',
                width: '100%',
                backdropFilter: 'brightness(45%)',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 25,
              }}
            >
              <Box
                flexGrow={1}
                display='flex'
                flexDirection="column"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="center"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                >
                  <Typography
                    textAlign="center"
                    variant="h5"
                    sx={{
                      fontWeight: 500,
                      mt: 3,
                      mb: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 10,
                      color: alpha("#fff", 0.9),
                    }}
                  >
                    {motorbike.title}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Body>
    </>
  );
}

export default MotorbikeInfo;