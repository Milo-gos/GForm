import { useMutation } from '@tanstack/react-query';
import { createSurvey } from '../../../API/axios';

const useCreateNewSurveyMutation = () => {
    return useMutation({
        mutationKey: [`createSurveyMutation`],
        mutationFn: createSurvey,
    });
};

export default useCreateNewSurveyMutation;
