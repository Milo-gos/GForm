import { useMutation } from '@tanstack/react-query';
import { changeOption } from '../../../API/axios';

const useChangeOptionMutation = () => {
    return useMutation({
        mutationKey: ['changeOption'],
        mutationFn: changeOption,
    });
};

export default useChangeOptionMutation;
