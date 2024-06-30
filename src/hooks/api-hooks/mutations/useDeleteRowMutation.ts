import { useMutation } from '@tanstack/react-query';
import { deleteRow } from '../../../API/axios';

const useDeleteRowMutation = () => {
    return useMutation({
        mutationKey: [`deleteRow`],
        mutationFn: deleteRow,
    });
};

export default useDeleteRowMutation;
