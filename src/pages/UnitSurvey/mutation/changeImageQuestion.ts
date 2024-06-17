import { useMutation } from '@tanstack/react-query';
import { changeImageQuestion } from '../../../utils/API/axios';

const useChangeImageQuestionMutation = () => {
    return useMutation({
        mutationKey: [`changeImageQuestion`],
        mutationFn: changeImageQuestion,
    });
};

export default useChangeImageQuestionMutation;
