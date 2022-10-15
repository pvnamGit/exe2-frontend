import React, { useContext, useState, useEffect } from 'react';
import {
  Grid, Pagination, Box, Typography,
} from '@mui/material';
// import { NavLink } from 'react-router-dom';
import MotorbikeSingleList from './MotorbikeSingleList';
import { LoadingDNA3X } from '../../common/Loading';
import MotorbikesService from '../../../services/motorbikes.service';

const MotorbikesList = (props) => {
  const [page, setPage] = useState(1);
  const [fetched, setFetched] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [motorbikesList, setMotorbikesList] = useState([]);
  console.log("🚀 ~ file: MotorbikeList.js ~ line 16 ~ MotorbikesList ~ motorbikesList", motorbikesList)
  
  const onChangePage = (event, newValue) => {
    setPage(newValue);
  };

  // useEffect(() => {
  //   setTotalPage(Math.ceil(MotorbikesContext.total/MotorbikesContext.limit));
  // }, [MotorbikesContext]);

  useEffect( async () => {
    setFetched(false);
    const list = await MotorbikesService.getMotorbikesList();
    setMotorbikesList(list.data);
    setFetched(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid
      container
    >
      {
        !fetched
          ? (
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                padding: '0.35rem',
              }}
            >
              <LoadingDNA3X />
            </Grid>
          )
          : (
            motorbikesList.map((motorbike) => (
              <Grid
                item
                key={motorbike.id}
                md={4}
                xs={6}
                sx={{
                  padding: '0.35rem',
                }}
              >
                <MotorbikeSingleList
                  motorbike={motorbike}
                />
              </Grid>
            ))
          )
      }
      {
        fetched && motorbikesList.length === 0 && (
          <Grid
              item
              md={12}
              xs={12}
              sx={{
                padding: '0.35rem',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6">
                No Motorbike is found
              </Typography>
            </Grid>
        )
      }
      <Grid
        item
        md={12}
        xs={12}
        sx={{ mt: 1 }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Pagination
            page={page}
            count={totalPage || 1}
            color="primary"
            onChange={onChangePage}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default MotorbikesList;