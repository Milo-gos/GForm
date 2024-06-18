import { useMutation } from '@tanstack/react-query';
import { changeEditSharedUser } from '../../../API/axios';

const useChangeEditSharedUserMutation = () => {
    return useMutation({
        mutationKey: [`changeEditSharedUser`],
        mutationFn: changeEditSharedUser,
    });
};

export default useChangeEditSharedUserMutation;
