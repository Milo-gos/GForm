import { useQuery } from '@tanstack/react-query';
import { getSharedUserSurvey } from '../../../API/axios';

const useGetSharedUserSurveyQuery = (id: string) => {
    return useQuery({
        queryKey: [`getSharedUserSurvey_${id}`],
        queryFn: () => getSharedUserSurvey(id!),
        refetchOnWindowFocus: false,
        retry: 0,
    });
};

export default useGetSharedUserSurveyQuery;
