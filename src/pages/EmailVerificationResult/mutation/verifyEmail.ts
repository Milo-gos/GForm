import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '../../../utils/API/axios';

const useVerifyEmailMutation = () => {
    return useMutation({
        mutationKey: [`VerifyEmail`],
        mutationFn: verifyEmail,
    });
};

export default useVerifyEmailMutation;
