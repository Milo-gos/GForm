import { useMutation } from '@tanstack/react-query';
import { changeQuestion } from '../../../API/axios';

const useChangeQuestionMutation = () => {
    return useMutation({
        mutationKey: [`changeQuestion`],
        mutationFn: changeQuestion,
    });
};

export default useChangeQuestionMutation;
