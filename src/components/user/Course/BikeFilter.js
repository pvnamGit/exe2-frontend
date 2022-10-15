import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import React, { useState, useContext } from 'react';
import { SubjectContext } from '../../../context/subject.context';
import MuiSearch from '../../common/MuiSearch';

const BikeFilter = (props) => {
  const { onGetMotobikesList } = props;
  const subjectContext = useContext(SubjectContext);
  const [subjectId, setSubjectId] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);
  const [dateOfHire, setdateOfHire] = useState(null);
  const [returnDate, setreturnDate] = useState(null);
  const [tutorName, setTutorName] = useState('');

  const onChangeType = (event) => {
    setSubjectId(event.target.value);
  }

  const onFiler = () => {
    onGetMotobikesList({
      page: 1,
      subjectId,
      courseName,
      minCost: minCost ? minCost : null, 
      maxCost: maxCost ? maxCost : null,
      dateOfHire,
      returnDate,
      tutorName,
    })
  };

  return (
    <Box
      sx={{
        p: 2,
        border: 3,
        borderColor: 'primary.main',
        borderRadius: 3,
      }}
    >
      <Box>
        <MuiSearch
          label="Search motobike name"
          value={courseName}
          onChange={(event) => setCourseName(event.target.value)}
          onSearhc={onFiler}
        />
      </Box>
      <Box
        sx={{ mt: 2 }}
      >
        <MuiSearch
          label="Search address"
          value={tutorName}
          onChange={(event) => setTutorName(event.target.value)}
          onSearhc={onFiler}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ mt: 2 }}
      >
        <Typography gutterBottom>
          Cost range - thousand VND
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ mt: 1 }}
        >
          <TextField
            label="Min Cost"
            value={minCost || ''}
            onChange={(event) => setMinCost(event.target.value)}
            sx={{ mr: 1 }}
          />
          <TextField
            label="Max Cost"
            value={maxCost || ''}
            onChange={(event) => setMaxCost(event.target.value)}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ mt: 2 }}
      >
        <Typography gutterBottom>
          Time hiring range
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ mt: 1 }}
        >
          <TextField
            type='date'
            value={dateOfHire || ''}
            onChange={(event) => setdateOfHire(event.target.value)}
            sx={{ mr: 1 }}
          />
          <TextField
            type='date'
            value={returnDate || ''}
            onChange={(event) => setreturnDate(event.target.value)}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ mt: 2 }}
      >
        <FormControl
          sx={{ flexGrow: 1 }}
        >
          <InputLabel id="select-subject">Types</InputLabel>
          <Select
            id="select-bike-type"
            label="Types"
            value={subjectId || 0}
            onChange={(event) => onChangeType(event)}
            sx={{ minWidth: '8.5rem', height: '2.5rem' }}
          >
            <MenuItem
              value={0}
            >
              Bike types
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={onFiler}
          sx={{ ml: 1}}
          color="secondary"
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
}

export default BikeFilter;
