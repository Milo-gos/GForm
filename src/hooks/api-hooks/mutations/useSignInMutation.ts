import { useMutation } from '@tanstack/react-query';
import { signIn } from '../../../API/axios';

const useSignInMutation = () => {
    return useMutation({
        mutationKey: [`signIn`],
        mutationFn: signIn,
    });
};

export default useSignInMutation;
