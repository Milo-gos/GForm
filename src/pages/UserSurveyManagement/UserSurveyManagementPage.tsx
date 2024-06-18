import React from 'react';
import { useLocation } from 'react-router-dom';
import UserSurvey from './containers/UserSurvey';
import SharedSurvey from './containers/SharedUserSurvey';

const UserSurveyManagementPage = () => {
    const location = useLocation();
    const isSharedPage = location.hash === '#shared';
    if (isSharedPage) return <SharedSurvey />;
    return <UserSurvey />;
};

export default UserSurveyManagementPage;
