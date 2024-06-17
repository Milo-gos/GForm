import { useMutation } from '@tanstack/react-query';
import { addQuestion } from '../../../utils/API/axios';

const useAddQuestionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addQuestion_${questionId}`],
        mutationFn: addQuestion,
    });
};

export default useAddQuestionMutation;
