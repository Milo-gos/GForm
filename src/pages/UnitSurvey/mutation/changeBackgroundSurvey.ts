import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { changeBackgroundSurvey, changeSurvey } from '../../../API/axios';

const useChangeBackgroundSurveyMutation = () => {
    const { id } = useParams();
    return useMutation({
        mutationKey: [`changeBackgroundSurvey_${id}`],
        mutationFn: changeBackgroundSurvey,
    });
};

export default useChangeBackgroundSurveyMutation;
