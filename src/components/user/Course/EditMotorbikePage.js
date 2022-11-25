import React, { useState, useContext } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { AdminMotorbikesContext } from '../../../context/adminMotorbikes.context';
import { ToastContext } from '../../../context/toast.context';
import MotorbikesService from '../../../services/motorbikes.service';

const EditCourseInformation = (props) => {
  const [motorbike, setMotorbike] = useState({});
  const [costError, setCostError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [saving, setSaving] = useState(false);

  const motorbikesContext = useContext(AdminMotorbikesContext);
  const toastContext = useContext(ToastContext);

  const onChangeTitle = (event) => {
    setMotorbike({ ...motorbike, courseName: event.target.value });
  }

  const onChangeDescription = (event) => {
    setMotorbike({ ...motorbike, courseDescription: event.target.value });
  }

  const validateCost = (cost) => {
    const costNumber = parseInt(cost, 10);
    if (costNumber > 2000) {
      setCostError('Cost should not be greater than 2.000 thousand VND')
    } else {
      setCostError('');
    }
  }

  const onChangeCost = (event) => {
    setMotorbike({ ...motorbike, cost: event.target.value });
    validateCost(event.target.value);
  }

  const validateLength = (length) => {
    const lengthNumber = parseInt(length, 10);
    if (lengthNumber > 60 * 5) {
      setLengthError('Lession length should not be greater than 5 hours.')
    } else if (lengthNumber < 60) {
      setLengthError('Lession length should not be smaller than 1 hour.')
    } else {
      setLengthError('');
    }
  }

  const onChangeLength = (event) => {
    setMotorbike({ ...motorbike, length: event.target.value });
    validateLength(event.target.value);
  }

  const onSaveCourse = async () => {
    setSaving(true);
    const response = await MotorbikesService.updateCourse(motorbike.id, motorbike);
    if (typeof response === 'string') {
      toastContext.addNotification('Error', response, 'error');
    } else {
      toastContext.addNotification('Success');
    }
    setSaving(false);
  }

  return (
    <Paper
      sx={{
        px: 2,
        py: 2,
        border: 2,
        borderColor: 'primary.main',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        minHeight: '23rem',
      }}
      variant='outlined'
    >
      <Box mb={2}>
        <TextField
          variant="outlined"
          fullWidth
          type='text'
          label="Title"
          name="title"
          value={motorbike.courseName || ''}
          onChange={onChangeTitle}
        />
      </Box>
      <Box mb={2}>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          maxRows={10}
          label="Descrtiption"
          name="description"
          value={motorbike.courseDescription || ''}
          onChange={onChangeDescription}
        />
      </Box>
      <Box
        mb={2}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box flexGrow={1} mr={2}>
          <TextField
            fullWidth
            variant="outlined"
            type='number'
            label="Cost (thousand VNĐ)"
            name="cost"
            value={motorbike.cost || ''}
            onChange={onChangeCost}
            helperText={costError}
            error={!!costError}
          />
        </Box>
        <Box flexGrow={1}>
          <TextField
            fullWidth
            variant="outlined"
            type='number'
            label="Duration day"
            name="legnth"
            value={motorbike.length || ''}
            onChange={onChangeLength}
            helperText={lengthError}
            error={!!lengthError}
          />
        </Box>
      </Box>
      <Box
        mb={1}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Button
          variant="contained"
          onClick={onSaveCourse}
          disabled={saving}
        >
          Save
          &nbsp;
          <SaveIcon />
        </Button>
      </Box>
    </Paper>
  );
}

export default EditCourseInformation;
