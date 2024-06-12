import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import API from '../../../utils/api';
import SurveyInterface from '../../../utils/interfaces/survey';
import InstanceAxios from '../../../utils/axios/instanceAxios';
import { createSurvey } from '../../../utils/API/axios';

const useCreateNewSurveyMutation = () => {
    return useMutation({
        mutationKey: [`createSurveyMutation`],
        mutationFn: createSurvey,
    });
};

export default useCreateNewSurveyMutation;
