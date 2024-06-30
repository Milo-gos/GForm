import { useMutation } from '@tanstack/react-query';
import { addFirstQuestion } from '../../../API/axios';

const useAddFirstQuestionMutation = () => {
    return useMutation({
        mutationKey: [`addFirstQuestion`],
        mutationFn: addFirstQuestion,
    });
};

export default useAddFirstQuestionMutation;
