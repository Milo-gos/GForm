import { useMutation } from '@tanstack/react-query';
import { deleteQuestion } from '../../../API/axios';

const useDeleteQuestionMutation = () => {
    return useMutation({
        mutationKey: [`deleteQuestion`],
        mutationFn: deleteQuestion,
    });
};

export default useDeleteQuestionMutation;
