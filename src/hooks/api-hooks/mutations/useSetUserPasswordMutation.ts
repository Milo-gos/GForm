import { useMutation } from '@tanstack/react-query';
import { setUserPassword } from '../../../API/axios';

const useSetUserPasswordMutation = () => {
    return useMutation({
        mutationKey: [`useSetUserPasswordMutation`],
        mutationFn: setUserPassword,
    });
};

export default useSetUserPasswordMutation;
