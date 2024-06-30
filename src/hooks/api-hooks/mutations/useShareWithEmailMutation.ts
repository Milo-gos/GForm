import { useMutation } from '@tanstack/react-query';
import { shareWithEmail } from '../../../API/axios';

const useShareWithEmailMutation = () => {
    return useMutation({
        mutationKey: [`shareWithEmail`],
        mutationFn: shareWithEmail,
    });
};

export default useShareWithEmailMutation;
