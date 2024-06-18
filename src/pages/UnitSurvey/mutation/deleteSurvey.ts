import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deleteSurvey } from '../../../API/axios';

const useDeleteSurveyMutation = () => {
    const { id } = useParams();
    return useMutation({
        mutationKey: [`deleteSurvey_${id}`],
        mutationFn: deleteSurvey,
    });
};

export default useDeleteSurveyMutation;
