import { useMutation } from '@tanstack/react-query';
import { changeGColumn } from '../../../API/axios';

const useChangeGColumnMutation = (gcolumnId?: string) => {
    return useMutation({
        mutationKey: [`changeGColumn_${gcolumnId}`],
        mutationFn: changeGColumn,
    });
};

export default useChangeGColumnMutation;
