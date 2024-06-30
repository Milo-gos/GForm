import { useMutation } from '@tanstack/react-query';
import { changeUserPassword, changeUsername } from '../../../API/axios';

const useChangeUserPasswordMutation = () => {
    return useMutation({
        mutationKey: [`useChangeUserPasswordMutation`],
        mutationFn: changeUserPassword,
    });
};

export default useChangeUserPasswordMutation;
