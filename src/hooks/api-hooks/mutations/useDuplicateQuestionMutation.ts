import { useMutation } from '@tanstack/react-query';
import { duplicateQuestion } from '../../../API/axios';

const useDuplicateQuestionMutation = () => {
    return useMutation({
        mutationKey: ['duplicateQuestion'],
        mutationFn: duplicateQuestion,
    });
};

export default useDuplicateQuestionMutation;
