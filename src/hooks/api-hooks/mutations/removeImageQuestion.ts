import { useMutation } from '@tanstack/react-query';
import { removeImageQuestion } from '../../../API/axios';

const useRemoveImageQuestionMutation = () => {
    return useMutation({
        mutationKey: [`removeImageQuestion`],
        mutationFn: removeImageQuestion,
    });
};

export default useRemoveImageQuestionMutation;
