import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Icon,
  Typography,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { AdminMotorbikesContext } from '../../../context/adminMotorbikes.context';
import NavigationBar from '../../common/NavigationBar';
import Body from '../../basic/Body';
import { LoadingPage } from '../../common/Loading';
import Page404 from '../../common/404';
import { Box } from '@mui/system';
import SideTabControl from '../../basic/SideTabControl/SideTabControl';
import SideTabContent from '../../basic/SideTabControl/SideTabContent';
import EditCourseInformation from './EditCourseInformation';
import EditCourseMaterial from './EditCourseMaterial';
import EditCourseTimetable from './EditCourseTimetable';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import EditCourseStudent from './EditCourseStudent';
import MotorbikesService from '../../../services/motorbikes.service';

const EditMotorbikePage = (props) => {
  const [fetched, setFetched] = useState(false);
  const [motorbike, setMotorbike] = useState({});

  const motorbikesContext = useContext(AdminMotorbikesContext);

  const fetchCourse = async () => {
    setFetched(false);
    const newMotorbike = await MotorbikesService.getMotorbike(1);
    setMotorbike(newMotorbike);
    setFetched(true);
  };

  useEffect(() => {
    fetchCourse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!fetched) {
    return <LoadingPage />
  }

  if (fetch && !motorbikesContext.course) {
    return <Page404 />
  }

  return (
    <>
      <NavigationBar
        nav={[
          ['admin', '/admin'],
          ['courses', '/admin/courses'],
          [motorbike.courseName || ''],
        ]}
      />
      <Body>
        <Grid item md={10} xs={12}>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            sx={{ pl: 2, mb: 3 }}
          >
            {motorbike.courseName}
          </Typography>
          <Box display="flex" flexDirection="column">
            <SideTabControl
              childClassName="edit-course-sidetab"
              activeClassName="active-tab"
              controlKey="editcourse-view"
              direction="row"
            >
              <Typography className="text-vertical" variant="h6" route="info" key="info">
                Information
                &nbsp;
                <Icon>
                  <AssignmentIcon />
                </Icon>
              </Typography>
              <Typography className="text-vertical"  variant="h6" route="time" key="time">
                Available Time
                &nbsp;
                <Icon>
                  <TimelapseIcon />
                </Icon>
              </Typography>
              <Typography className="text-vertical" variant="h6" route="material" key="material">
                Materials
                &nbsp;
                <Icon>
                  <CloudDownloadIcon />
                </Icon>
              </Typography>
              <Typography className="text-vertical" variant="h6" route="student" key="student">
                Students
                &nbsp;
                <Icon>
                  <SupervisedUserCircleIcon />
                </Icon>
              </Typography>
            </SideTabControl>
            <SideTabContent controlKey="editcourse-view">
              <Box route="info" flexGrow={1}>
                <EditCourseInformation
                  course={motorbike}
                />
              </Box>
              <Box route="material" flexGrow={1}>
                <EditCourseMaterial
                  course={motorbike}
                />
              </Box>
              <Box route="time" flexGrow={1}>
                <EditCourseTimetable
                  course={motorbike}
                />
              </Box>
              <Box route="student" flexGrow={1}>
                <EditCourseStudent
                  course={motorbike}
                />
              </Box>
            </SideTabContent>
          </Box>
        </Grid>
      </Body>
    </>
  );
}

export default EditMotorbikePage;
