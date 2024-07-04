import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { changeBackgroundSurvey, changeSurvey } from '../../../API/axios';

const useChangeBackgroundSurveyMutation = () => {
    return useMutation({
        mutationKey: ['changeBackgroundSurvey'],
        mutationFn: changeBackgroundSurvey,
    });
};

export default useChangeBackgroundSurveyMutation;
