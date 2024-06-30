import { useMutation } from '@tanstack/react-query';
import { changeImageQuestion } from '../../../API/axios';

const useChangeImageQuestionMutation = () => {
    return useMutation({
        mutationKey: [`changeImageQuestion`],
        mutationFn: changeImageQuestion,
    });
};

export default useChangeImageQuestionMutation;
