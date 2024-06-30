import { useMutation } from '@tanstack/react-query';
import { changeRow } from '../../../API/axios';

const useChangeRowMutation = () => {
    return useMutation({
        mutationKey: [`changeRow`],
        mutationFn: changeRow,
    });
};

export default useChangeRowMutation;
