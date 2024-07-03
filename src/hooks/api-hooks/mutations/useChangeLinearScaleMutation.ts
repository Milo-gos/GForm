import { useMutation } from '@tanstack/react-query';
import { changeLinearScale } from '../../../API/axios';

const useChangeLinearScaleMutation = () => {
    return useMutation({
        mutationKey: ['changeLinearScale'],
        mutationFn: changeLinearScale,
    });
};

export default useChangeLinearScaleMutation;
