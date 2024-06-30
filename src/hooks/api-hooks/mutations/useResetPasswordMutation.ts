import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../../API/axios';

const useResetPasswordMutation = () => {
    return useMutation({
        mutationKey: [`reseResetPasswordMutation`],
        mutationFn: resetPassword,
    });
};

export default useResetPasswordMutation;
