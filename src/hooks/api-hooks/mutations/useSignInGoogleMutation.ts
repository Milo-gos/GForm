import { useMutation } from '@tanstack/react-query';
import { signInGoogle } from '../../../API/axios';

const useSignInGoogleMutation = () => {
    return useMutation({
        mutationKey: ['signInGoogle'],
        mutationFn: signInGoogle,
    });
};

export default useSignInGoogleMutation;
