import { useMutation } from '@tanstack/react-query';
import { verifyLinkResetPassword } from '../../../API/axios';

const useVerifyLinkResetPasswordMutation = () => {
    return useMutation({
        mutationKey: [`verifyLinkResetPassword`],
        mutationFn: verifyLinkResetPassword,
    });
};

export default useVerifyLinkResetPasswordMutation;
