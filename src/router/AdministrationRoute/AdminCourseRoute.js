import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddMotorbikePage from '../../components/administrator/course/AddMotorbikePage';
import CoursePage from '../../components/administrator/course/CoursePage';
import AdminCourseProvider from '../../context/adminMotorbikes.context';
import AdminCourseMaterialProvider from '../../context/adminCourseMaterial.context';
import AdminCourseStudentProvider from '../../context/AdminCourseStudent.context';
import AdminCourseTimetableProvider from '../../context/adminCourseTimetable.context';

const AdminUserRoute = () => {
  return (
    <AdminCourseProvider>
      <AdminCourseMaterialProvider>
        <AdminCourseTimetableProvider>
          <AdminCourseStudentProvider>
            <Switch>
                <Route path="/admin/courses/add" component={AddMotorbikePage} />
                <Route path="/admin/courses" component={CoursePage} />
            </Switch>
          </AdminCourseStudentProvider>
        </AdminCourseTimetableProvider>
      </AdminCourseMaterialProvider>
    </AdminCourseProvider>
  );
};

export default AdminUserRoute;
