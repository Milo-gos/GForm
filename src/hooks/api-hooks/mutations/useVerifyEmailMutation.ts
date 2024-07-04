import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '../../../API/axios';

const useVerifyEmailMutation = () => {
    return useMutation({
        mutationKey: ['verifyEmail'],
        mutationFn: verifyEmail,
    });
};

export default useVerifyEmailMutation;
