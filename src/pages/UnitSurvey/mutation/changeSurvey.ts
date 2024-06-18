import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { changeSurvey } from '../../../API/axios';

const useChangeSurveyMutation = () => {
    const { id } = useParams();
    return useMutation({
        mutationKey: [`changeSurvey${id}`],
        mutationFn: changeSurvey,
    });
};

export default useChangeSurveyMutation;
