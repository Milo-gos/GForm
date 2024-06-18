import { useMutation } from '@tanstack/react-query';
import { addGColumn } from '../../../API/axios';

const useAddGColumnMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addGColumn_${questionId}`],
        mutationFn: addGColumn,
    });
};

export default useAddGColumnMutation;
