import { useMutation } from '@tanstack/react-query';
import { changeUserPassword, changeUsername } from '../../../utils/API/axios';

const useChangeUserPasswordMutation = () => {
    return useMutation({
        mutationKey: [`useChangeUserPasswordMutation`],
        mutationFn: changeUserPassword,
    });
};

export default useChangeUserPasswordMutation;
