import { useMutation } from '@tanstack/react-query';
import { changeQuestion } from '../../../utils/API/axios';

const useChangeQuestionMutation = (questionId: string) => {
    return useMutation({
        mutationKey: [`changeQuestion_${questionId}`],
        mutationFn: changeQuestion,
    });
};

export default useChangeQuestionMutation;
