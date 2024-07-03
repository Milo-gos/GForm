import { useMutation } from '@tanstack/react-query';
import { changeSurvey } from '../../../API/axios';

const useChangeSurveyMutation = () => {
    return useMutation({
        mutationKey: ['changeSurvey'],
        mutationFn: changeSurvey,
    });
};

export default useChangeSurveyMutation;
