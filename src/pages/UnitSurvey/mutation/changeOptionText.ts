import { useMutation } from '@tanstack/react-query';
import { changeOption } from '../../../utils/API/axios';

const useChangeOptionMutation = (optionId?: string) => {
    return useMutation({
        mutationKey: [`changeOption_${optionId}`],
        mutationFn: changeOption,
    });
};

export default useChangeOptionMutation;
