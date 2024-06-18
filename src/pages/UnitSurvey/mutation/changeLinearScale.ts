import { useMutation } from '@tanstack/react-query';
import { changeLinearScale } from '../../../utils/API/axios';

const useChangeLinearScaleMutation = (linearScaleId?: string) => {
    return useMutation({
        mutationKey: [`changeLinearScale_${linearScaleId}`],
        mutationFn: changeLinearScale,
    });
};

export default useChangeLinearScaleMutation;
