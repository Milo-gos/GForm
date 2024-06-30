import { useMutation } from '@tanstack/react-query';
import { addRow } from '../../../API/axios';

const useAddRowMutation = () => {
    return useMutation({
        mutationKey: [`addOption`],
        mutationFn: addRow,
    });
};

export default useAddRowMutation;
