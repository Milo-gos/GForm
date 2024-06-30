import { useMutation } from '@tanstack/react-query';
import { deleteSurvey } from '../../../API/axios';

const useDeleteSurveyMutation = () => {
    return useMutation({
        mutationKey: [`deleteSurvey`],
        mutationFn: deleteSurvey,
    });
};

export default useDeleteSurveyMutation;
