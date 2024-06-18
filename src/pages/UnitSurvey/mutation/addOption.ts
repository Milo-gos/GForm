import { useMutation } from '@tanstack/react-query';
import { addOPtion } from '../../../API/axios';

const useAddOptionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addOption_${questionId}`],
        mutationFn: addOPtion,
    });
};

export default useAddOptionMutation;
