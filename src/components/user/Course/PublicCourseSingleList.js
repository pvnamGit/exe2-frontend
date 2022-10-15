import {
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const PublicCourseSingleList = ({ motorbike }) => {


  return (
    <Box
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        height: '14rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        bgcolor: 'primary.main',
        width: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        backgroundImage: 'https://www.hondaireland.ie/assets/2018/11/Honda-CBR650R-05-e1547808350784-640x425.jpg',
        '&:hover': {
          boxShadow: 7,
        },
      }}
    >
      <Box
        sx={{
          width: 'calc(100%-1rem)',
          bgcolor: '#fff',
          padding: 2,
          borderRadius: 2,
          borderTopRightRadius: 18,
          borderTopLeftRadius: 0,
        }}
      >
        <NavLink
          to={`/motobike/${motorbike}`}
        >
          <Box>
            <Typography
              fontWeight="bold"
              fontSize="h6.fontSize"
              noWrap
            >
              {motorbike.title}
            </Typography>
          </Box>
          <Box
            sx={{ my: 1 }}
          >
            <Typography
              noWrap
            >
              {motorbike.description && motorbike.description.substring(0, Math.min(motorbike.description.length, 50))}
            </Typography>
          </Box>
        </NavLink>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <Typography
            typography="body1"
            fontWeight="bold"
            fontStyle="italic"
            textAlign="center"
          >
            {`${Math.floor(parseInt(motorbike.cost, 10))}K/${motorbike.durationDay}'`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
 
export default PublicCourseSingleList
