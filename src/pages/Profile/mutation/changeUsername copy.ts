import { useMutation } from '@tanstack/react-query';
import { changeUsername } from '../../../utils/API/axios';

const useChangeUsernameMutation = () => {
    return useMutation({
        mutationKey: [`useChangeUsernameMutation`],
        mutationFn: changeUsername,
    });
};

export default useChangeUsernameMutation;
