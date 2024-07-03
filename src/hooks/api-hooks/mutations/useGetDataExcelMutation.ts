import { useMutation } from '@tanstack/react-query';
import { getDataExcel } from '../../../API/axios';

const useGetDataExcelMutation = () => {
    return useMutation({
        mutationKey: ['getDataExcel'],
        mutationFn: getDataExcel,
    });
};

export default useGetDataExcelMutation;
