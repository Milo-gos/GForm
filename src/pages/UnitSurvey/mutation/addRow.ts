import { useMutation } from '@tanstack/react-query';
import { addRow } from '../../../API/axios';

const useAddRowMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addOption_${questionId}`],
        mutationFn: addRow,
    });
};

export default useAddRowMutation;
