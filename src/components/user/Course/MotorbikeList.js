import React, { useState, useEffect } from 'react';
import {
  Grid, Pagination, Box, Typography, Button
} from '@mui/material';
import MuiSearch from '../../common/MuiSearch';
// import { NavLink } from 'react-router-dom';
import MotorbikeSingleList from './MotorbikeSingleList';
import { LoadingDNA3X } from '../../common/Loading';
import MotorbikesService from '../../../services/motorbikes.service';

const MotorbikesList = (props) => {
  const [page, setPage] = useState(1);
  const [fetched, setFetched] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [motorbikesList, setMotorbikesList] = useState([]);
  const [searchName, setSearchName] = useState('');
  const limitPage = 9;
  
  const onChangePage = (event, newValue) => {
    setPage(newValue);
  };

  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
  }

  const onSearch = async () => {
    setPage(1);
    await fetchMotorbike();
  }

  const fetchMotorbike = async () => {
    setFetched(false);
    const list = await MotorbikesService.getMotorbikesList({page, title: searchName});
    setMotorbikesList(list.data.data);
    const totalData = list.data.total;
    setTotalPage(totalData < limitPage ? 1 : Math.ceil(totalData / limitPage));
    setFetched(true);
  }
  useEffect(async () => {
    await fetchMotorbike();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchName])

  return (
    <>
      <Box
          display={'flex'}
          noWrap
          gap={1}
        >
          <Box flexGrow={1}>
            <MuiSearch
              value={searchName}
              onChange={onChangeSearchName}
              onSearch={onSearch}
            />
          </Box>
          <Button
            variant="contained"
            onClick={onSearch}
            color="secondary"
          >
            Search
          </Button>
      </Box>
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
    </>
  );
}

export default MotorbikesList;
