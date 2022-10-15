import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import NavigationBar from '../../common/NavigationBar';
import Body from '../../basic/Body';
import { ToastContext } from '../../../context/toast.context';
import UploadFileButton from '../../basic/UploadFileButton';
import { Loading } from '../../common/Loading';
import MotorbikesService from '../../../services/motorbikes.service';
import UserService from '../../../services/user.service';
import { getUserInformation } from '../../../utils/cookies';


const AddMotorbikePage = (props) => {
  const [motorbike, setMotorbike] = useState({ cost: 100, length: 1 });
  const [costError, setCostError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filename, setFilename] = useState('');
  const [disabledSaveBtn, setDisabledSaveBtn] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (getUserInformation()) {
        const newUser = await UserService.getUserProfile(getUserInformation().id);
        setUser(newUser);
        setMotorbike({ ...motorbike, userId: getUserInformation().id })
      }
    }
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toastContext = useContext(ToastContext);

  const onChangeTitle = (event) => {
    setMotorbike({ ...motorbike, title: event.target.value });
  }

  const onChangeDescription = (event) => {
    setMotorbike({ ...motorbike, description: event.target.value });
  }

  const onChangeContactInfo = (event) => {
    setMotorbike({ ...motorbike, contactInfo: event.target.value });
  };

  useEffect(() => {
    const shouldDisabledSaveBtn = !user.canCrud ||
      !motorbike.title || !motorbike.description || !motorbike.contactInfo || !motorbike.cost || !motorbike.durationDay;
    setDisabledSaveBtn(shouldDisabledSaveBtn)
  }, [motorbike, user])

  const validateCost = (cost) => {
    const costNumber = parseInt(cost, 10);
    if (costNumber > 2000) {
      setCostError('Cost should not be greater than 2.000.000 VND');
    } else if (costNumber < 0) {
      setCostError('Cost should be positive')
    } else {
      setCostError('');
    }
  }

  const onChangeCost = (event) => {
    setMotorbike({ ...motorbike, cost: event.target.value });
    validateCost(event.target.value);
  }

  const validateLength = (durationDay) => {
    if (durationDay < 1) {
      setLengthError('Duration day should greater than 1.')
    } else {
      setLengthError('');
    }
  }

  const onChangeFile = (event) => {
    setFile(event.target.files[0]);
    setFilename(event.target.value);
  }

  const onCancelFileUpload = () => {
    if (file) {
      setFile(undefined);
      setFilename('');
    }
  }

  const onChangeLength = (event) => {
    setMotorbike({ ...motorbike, durationDay: event.target.value });
    validateLength(event.target.value);
  }

  const onSaveMotorbike = async () => {
    setSaving(true);
    const response = await MotorbikesService.createMotorbike(motorbike);
    if (typeof response === 'string') {
      toastContext.addNotification('Error', response, 'error');
    } else {
      toastContext.addNotification('Success');
    }
    setSaving(false);
  }

  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Share bikes'],
        ]}
      />
      <Body>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ px: 2, py: 2 }} elevation={3}>
            <Box mb={2}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ textAlign: 'center' }}
              >
                Share your bike
              </Typography>
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                fullWidth
                type='text'
                label="Title"
                name="title"
                value={motorbike.title || ''}
                onChange={onChangeTitle}
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                maxRows={10}
                label="Descrtiption"
                name="description"
                value={motorbike.description || ''}
                onChange={onChangeDescription}
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                maxRows={10}
                label="Contact information"
                name="contactInfo"
                value={motorbike.contactInfo || ''}
                onChange={onChangeContactInfo}
              />
            </Box>
            <Box mb={2} display="flex" flexDirection="row">
              <Box flexGrow={1} mr={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type='number'
                  label="Cost"
                  name="cost"
                  value={motorbike.cost || ''}
                  onChange={onChangeCost}
                  helperText={costError || 'Must be less than 2,000,000 VND'}
                  error={!!costError}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">,000 VND / Day</InputAdornment>,
                  }}
                />
              </Box>
              <Box flexGrow={1} mr={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type='number'
                  label="Duration day"
                  name="legnth"
                  value={motorbike.durationDay || ''}
                  onChange={onChangeLength}
                  error={!!lengthError}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">day(s)</InputAdornment>,
                  }}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
            >
              <UploadFileButton
                value={filename}
                onChange={onChangeFile}
              />
              <Box>
                <Button
                  color="secondary"
                  variant="contained"
                  disabled={saving || !file}
                  sx={{ mr: 1 }}
                >
                  Create
                  {
                    saving && (<Loading />)
                  }
                </Button>
                <Button
                  color="warning"
                  variant="contained"
                  disabled={saving || !file}
                  onClick={onCancelFileUpload}
                >
                  Cancel
                </Button>
              </Box>
            </Box>  
            <Box mb={1} mt={1}>
              <Button
                variant="contained"
                onClick={onSaveMotorbike}
                disabled={saving || disabledSaveBtn}
              >
                Save
                &nbsp;
                <SaveIcon />
              </Button>
              {!user.canCrud && (
                <Typography
                variant="h6"
                >
                  You must buy subscription to create post
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </Body>
    </>
  );
}

export default AddMotorbikePage;
