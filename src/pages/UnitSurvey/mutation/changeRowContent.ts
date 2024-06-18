import { useMutation } from '@tanstack/react-query';
import { changeRow } from '../../../API/axios';

const useChangeRowMutation = (rowId?: string) => {
    return useMutation({
        mutationKey: [`changeRow_${rowId}`],
        mutationFn: changeRow,
    });
};

export default useChangeRowMutation;
