import { useMutation } from '@tanstack/react-query';
import { addGColumn } from '../../../API/axios';

const useAddGColumnMutation = () => {
    return useMutation({
        mutationKey: [`addGColumn`],
        mutationFn: addGColumn,
    });
};

export default useAddGColumnMutation;
