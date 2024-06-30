import { useMutation } from '@tanstack/react-query';
import { checkExistEmail } from '../../../API/axios';

const useCheckExistEmailMutation = () => {
    return useMutation({
        mutationKey: [`checkExistEmail`],
        mutationFn: checkExistEmail,
    });
};

export default useCheckExistEmailMutation;
