import { useMutation } from '@tanstack/react-query';
import { deleteQuestion } from '../../../API/axios';

const useDeleteQuestionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`deleteQuestion_${questionId}`],
        mutationFn: deleteQuestion,
    });
};

export default useDeleteQuestionMutation;
