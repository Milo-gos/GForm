import React from 'react';
import ResponseSurvey from './containers/ResponseSurvey';
import EditSurvey from './containers/EditSurvey';
import { useLocation } from 'react-router-dom';
import SettingSurvey from './containers/SettingSurvey';

const UnitSurveyPage = () => {
    const location = useLocation();
    const hash = location.hash;
    if (hash === '#response') return <ResponseSurvey />;
    else if (hash === '#setting') return <SettingSurvey />;
    return <EditSurvey />;
};

export default UnitSurveyPage;
