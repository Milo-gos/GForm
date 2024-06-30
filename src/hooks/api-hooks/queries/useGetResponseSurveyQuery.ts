import { useQuery } from '@tanstack/react-query';
import { getResponseSurvey } from '../../../API/axios';

const useGetResponseSurveyQuery = (id: string) => {
    return useQuery({
        queryKey: [`getResponseSurvey_${id}`],
        queryFn: () => getResponseSurvey(id!),
        refetchOnWindowFocus: false,
        retry: 0,
    });
};

export default useGetResponseSurveyQuery;
