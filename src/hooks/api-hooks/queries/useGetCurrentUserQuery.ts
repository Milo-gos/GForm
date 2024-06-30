import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../API/axios';

const useGetCurrentUserQuery = (enable?: boolean) => {
    return useQuery({
        queryKey: [`getCurrentUser`],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
        enabled: enable !== undefined ? enable : true,
    });
};

export default useGetCurrentUserQuery;
