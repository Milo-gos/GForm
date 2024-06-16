import { useMutation } from '@tanstack/react-query';
import { duplicateQuestion } from '../../../../../../../utils/API/axios';

const useDuplicateQuestionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`duplicateQuestion_${questionId}`],
        mutationFn: duplicateQuestion,
    });
};

export default useDuplicateQuestionMutation;
