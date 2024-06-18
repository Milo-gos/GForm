import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../../API/axios';

const useSignUpMutation = () => {
    return useMutation({
        mutationKey: [`signUp`],
        mutationFn: signUp,
    });
};

export default useSignUpMutation;
