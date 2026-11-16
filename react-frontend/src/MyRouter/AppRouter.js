import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleTasksPage from "../components/app_components/TasksPage/SingleTasksPage";
import TaskProjectLayoutPage from "../components/app_components/TasksPage/TaskProjectLayoutPage";
import SingleProjectsPage from "../components/app_components/ProjectsPage/SingleProjectsPage";
import ProjectProjectLayoutPage from "../components/app_components/ProjectsPage/ProjectProjectLayoutPage";
import SingleTaskcommentsPage from "../components/app_components/TaskcommentsPage/SingleTaskcommentsPage";
import TaskcommentProjectLayoutPage from "../components/app_components/TaskcommentsPage/TaskcommentProjectLayoutPage";
import SingleTaskattachmentsPage from "../components/app_components/TaskattachmentsPage/SingleTaskattachmentsPage";
import TaskattachmentProjectLayoutPage from "../components/app_components/TaskattachmentsPage/TaskattachmentProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/tasks/:singleTasksId" exact element={<SingleTasksPage />} />
<Route path="/tasks" exact element={<TaskProjectLayoutPage />} />
<Route path="/projects/:singleProjectsId" exact element={<SingleProjectsPage />} />
<Route path="/projects" exact element={<ProjectProjectLayoutPage />} />
<Route path="/taskcomments/:singleTaskcommentsId" exact element={<SingleTaskcommentsPage />} />
<Route path="/taskcomments" exact element={<TaskcommentProjectLayoutPage />} />
<Route path="/taskattachments/:singleTaskattachmentsId" exact element={<SingleTaskattachmentsPage />} />
<Route path="/taskattachments" exact element={<TaskattachmentProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
