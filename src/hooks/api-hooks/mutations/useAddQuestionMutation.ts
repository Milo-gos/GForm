import { useMutation } from '@tanstack/react-query';
import { addQuestion } from '../../../API/axios';

const useAddQuestionMutation = () => {
    return useMutation({
        mutationKey: ['addQuestion'],
        mutationFn: addQuestion,
    });
};

export default useAddQuestionMutation;
