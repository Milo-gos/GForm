import React from 'react';
import ResponseSurvey from './Containers/ResponseSurvey';
import EditSurvey from './Containers/EditSurvey';
import { useLocation } from 'react-router-dom';

const UnitSurveyPage = () => {
    const location = useLocation();
    const isResponsePage = location.hash === '#response';
    if (isResponsePage) return <ResponseSurvey />;
    return <EditSurvey />;
};

export default UnitSurveyPage;
