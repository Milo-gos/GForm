import { useMutation } from '@tanstack/react-query';
import { sendPasswordResetLink } from '../../../API/axios';

const useSendPasswordResetLinkMutation = () => {
    return useMutation({
        mutationKey: ['sendPasswordResetLinkMutation'],
        mutationFn: sendPasswordResetLink,
    });
};

export default useSendPasswordResetLinkMutation;
