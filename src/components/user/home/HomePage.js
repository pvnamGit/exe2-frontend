import React from 'react';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import {
  Box, Typography,
} from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import ShareIcon from '@mui/icons-material/Share';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { NavLink } from 'react-router-dom';

const HomePage = () => {

  return (
    <div>
      <NavigationBar
        nav={[
          ['Home']
        ]}
      />
      <Body>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Box style={{margin: 'auto'}}>
            <Typography
              variant="h4"
            >
              Let's Find Your Favourite Bike
            </Typography>
            <Typography
              component={Box}
              fontSize="h6.fontSize"
              sx={{
                maxWidth: '40rem',
              }}
            >
              A nice motobike makes you more beatuiful.
            </Typography>
          </Box>
          <Box>
            <img
              src="image/homepage_motobike.png"
              alt="learning-brain"
              style={{
                maxHeight: "20rem"
              }}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          gap="1rem"
          sx={{ mt: 3, pb: 6 }}
        >
          {
            [{
              color: 'primary.main',
              textColor: '#fff',
              text: 'Hiring a motobike',
              href: '/motobikes',
              icon: <TwoWheelerIcon sx={{ fontSize: "7rem" }} />,
            }, {
              color: 'secondary.main',
              textColor: '#fff',
              text: 'Share your bike',
              href: '/share-bike',
              icon: <ShareIcon sx={{ fontSize: "9rem" }} />,
            }, {
              color: 'warning.main',
              textColor: '#fff',
              text: 'Subscription',
              icon: <AttachMoneyIcon sx={{ fontSize: "9rem" }} />,
              href: '/subscription',
            }].map((item) => (
              <NavLink
                to={item.href}
                key={item.href}
              >
                <Box
                  sx={{
                    bgcolor: item.color,
                    borderRadius: 3,
                    color: item.textColor,
                    p: 2,
                    mx: 2,
                  }}
                  display="flex"
                  flexDirection="column"
                  textAlign="center"
                  alignItems="center"
                >
                  <Typography
                    component={Box}
                    fontSize="h6.fontSize"
                    fontWeight="bold"
                    sx={{
                      width: '10rem',
                    }}
                  >
                    {item.text}
                  </Typography>
                  {item.icon}
                </Box>
              </NavLink>
            ))
          }
        </Box>
      </Body>
    </div>
  );
}

export default HomePage;
