import { useMutation } from '@tanstack/react-query';
import { deleteSharedUser } from '../../../API/axios';

const useDeleteSharedUserMutation = () => {
    return useMutation({
        mutationKey: [`deleteSharedUser`],
        mutationFn: deleteSharedUser,
    });
};

export default useDeleteSharedUserMutation;
