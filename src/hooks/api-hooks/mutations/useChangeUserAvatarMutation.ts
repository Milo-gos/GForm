import { useMutation } from '@tanstack/react-query';
import { changeUserAvatar } from '../../../API/axios';

const useChangeUserAvatarMutation = () => {
    return useMutation({
        mutationKey: [`useChangeAvatarMutation`],
        mutationFn: changeUserAvatar,
    });
};

export default useChangeUserAvatarMutation;
