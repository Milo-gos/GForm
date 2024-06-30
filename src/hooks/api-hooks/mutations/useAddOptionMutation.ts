import { useMutation } from '@tanstack/react-query';
import { addOPtion } from '../../../API/axios';

const useAddOptionMutation = () => {
    return useMutation({
        mutationKey: [`addOption`],
        mutationFn: addOPtion,
    });
};

export default useAddOptionMutation;
