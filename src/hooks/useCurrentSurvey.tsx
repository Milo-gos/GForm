import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import SurveyInterface from '../utils/interfaces/survey';

const useCurrentSurvey = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const survey: SurveyInterface | undefined = queryClient.getQueryData([`getSurveyById_${id}`]);
    return survey;
};

export default useCurrentSurvey;
