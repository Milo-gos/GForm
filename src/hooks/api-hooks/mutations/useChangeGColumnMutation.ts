import { useMutation } from '@tanstack/react-query';
import { changeGColumn } from '../../../API/axios';

const useChangeGColumnMutation = () => {
    return useMutation({
        mutationKey: ['changeGColumn'],
        mutationFn: changeGColumn,
    });
};

export default useChangeGColumnMutation;
